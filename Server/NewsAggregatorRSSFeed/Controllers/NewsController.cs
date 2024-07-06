using Microsoft.AspNetCore.Mvc;
using Services;

namespace NewsAggregatorRSSFeed.Controllers
{
    public class NewsController : Controller
    {
        private readonly ApiService _apiService;

        public NewsController(ApiService apiService)
        {
            _apiService = apiService;
        }

        public async Task<IActionResult> Index()
        {
            var articles = await _apiService.FetchRssFeedsAsync();
            return Json(articles); // Return JSON data directly
        }
    }
}