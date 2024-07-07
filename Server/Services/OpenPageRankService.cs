using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Services
{
    public class OpenPageRankService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public OpenPageRankService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<double> GetTrustScoreAsync(string urlToCheck)
        {

            var apiKey = _configuration["OpenPageRank:ApiKey"];
            var escapedUrl = Uri.EscapeDataString(urlToCheck);
            var apiUrl = $"https://openpagerank.com/api/v1.0/getPageRank";
            var query = $"?domains[]={escapedUrl}";

            var url = apiUrl + query;

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("API-OPR", apiKey);

            try
            {
                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var trustData = JsonConvert.DeserializeObject<OpenPageRankResponse>(content);

                    return trustData.Response[0].PageRankDecimal;
                }

                Console.WriteLine($"Failed to get trust score. Status code: {response.StatusCode}");

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting trust score: {ex.Message}");
            }

            return 0.0;
        }

        private class OpenPageRankResponse
        {
            [JsonProperty("status_code")]
            public int StatusCode { get; set; }
            
            [JsonProperty("response")]
            public List<OpenPageRankResult> Response { get; set; }

            [JsonProperty("last_updated")]
            public string LastUpdated { get; set; }

        }

        private class OpenPageRankResult
        {
            [JsonProperty("status_code")]
            public int StatusCode { get; set; }

            [JsonProperty("error")]
            public string Error { get; set; }

            [JsonProperty("page_rank_integer")]
            public int PageRankInteger { get; set; }

            [JsonProperty("page_rank_decimal")]
            public double PageRankDecimal { get; set; }

            [JsonProperty("rank")]
            public string Rank { get; set; }

            [JsonProperty("domain")]
            public string Domain { get; set; }

        }
    }
}
