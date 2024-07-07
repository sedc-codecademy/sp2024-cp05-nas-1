using System.Text.RegularExpressions;
using DomainModels;
using System.Xml.Linq;

namespace Services
{
    public class ApiService
    {
        private List<UrlConfig> urls;

        public ApiService()
        {
           urls = new List<UrlConfig>
            {
                new UrlConfig
                {
                    Source = "MIA",
                    FeedUrl = "https://mia.mk/feed",
                    Title = "title",
                    Description = "description",
                    Link = "link",
                    Author = "author",
                    PubDate = "pubDate",
                    UrlToImage = new List<string> { "enclosure", "url" }
                },
                new UrlConfig
                {
                    Source = "Telma",
                    FeedUrl = "https://telma.com.mk/feed/",
                    Title = "title",
                    Description = "content:encoded",
                    Link = "link",
                    Author = "dc:creator", // Example where author tag may vary
                    PubDate = "pubDate",
                    UrlToImage = new List<string> { "content:encoded", @"<img[^>]*src=\""([^\""]*)\""" } //<img[^>]*src=\"([^\"]*)\"
                },
                new UrlConfig
                {
                    Source = "24Vesti",
                    FeedUrl = "https://admin.24.mk/api/rss.xml",
                    Title = "title",
                    Description = "content",
                    Link = "link",
                    Author = "",
                    PubDate = "pubDate",
                    UrlToImage = new List<string> { "img", "src" },
                },
                new UrlConfig
                {
                    Source = "Sitel",
                    FeedUrl = "https://sitel.com.mk/rss.xml",
                    Title = "title",
                    Description = "description",
                    Link = "link",
                    Author = "dc:creator",
                    PubDate = "pubDate",
                    UrlToImage = new List<string> { "description", @"<img[^>]*src=\""([^\""]*)\""" }
                },
                new UrlConfig
                {
                    Source = "Kanal5",
                    FeedUrl = "https://kanal5.com.mk/rss.aspx",
                    Title = "title",
                    Description = "content",
                    Link = "link",
                    Author = "author", // Example where author tag may be different
                    PubDate = "pubDate",
                    UrlToImage = new List<string> { "thumbnail", "" }
                }
            };
        }

        public async Task<List<Article>> FetchRssFeedsAsync()
        {
            var allArticles = new List<Article>();

            foreach (var urlConfig in urls)
            {
                try
                {
                    var xmlData = await FetchRssFeedXmlAsync(urlConfig.FeedUrl);
                    var parsedArticles = ParseRss(xmlData, urlConfig);
                    allArticles.AddRange(parsedArticles);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error fetching or parsing RSS feed from {urlConfig.Source}: {ex.Message}");
                }
            }

            return allArticles;
        }

        private async Task<string> FetchRssFeedXmlAsync(string feedUrl)
        {
            //using (var httpClient = new HttpClient())
            //{
            //    var response = await httpClient.GetAsync(feedUrl);
            //    response.EnsureSuccessStatusCode();
            //    return await response.Content.ReadAsStringAsync();
            //}
            using (var httpClient = new HttpClient())
            {
                // Set the User-Agent header to your desired value
                httpClient.DefaultRequestHeaders.Add("User-Agent", "RSSFetcher/1.0");

                var response = await httpClient.GetAsync(feedUrl);
                response.EnsureSuccessStatusCode();

                return await response.Content.ReadAsStringAsync();
            }
        }

        private List<Article> ParseRss(string xmlData, UrlConfig urlConfig)
        {
            var articles = new List<Article>();

            try
            {
                xmlData = RemoveScriptTags(xmlData);
                var xmlDoc = XDocument.Parse(xmlData);

                foreach (var item in xmlDoc.Descendants("item"))
                {
                    if (item.Descendants("script").Any())
                    {
                        continue;
                    }

                    var article = new Article
                    {
                        Title = GetElementValue(item, urlConfig.Title),
                        Description = StripHtmlTags(GetElementValue(item, urlConfig.Description)),
                        Link = GetElementValue(item, urlConfig.Link),
                        Author = GetElementValue(item, urlConfig.Author),
                        PubDate = GetElementValue(item, urlConfig.PubDate),
                        UrlToImage = ExtractImageUrl(item, urlConfig.UrlToImage)
                    };
                    articles.Add(article);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing RSS feed: {ex.Message}");
            }

            return articles;
        }

        private string GetElementValue(XElement parent, string tagName)
        {
            if (tagName == "")
            {
                return "";
            }

            XElement element = FindElementByTagName(parent, tagName);
            return element?.Value.Trim() ?? string.Empty;
        }

        private XElement FindElementByTagName(XElement parent, string tagName)
        {
            if (tagName.Contains(":"))
            {
                var parts = tagName.Split(':');
                var prefix = parts[0];
                var localName = parts[1];
                var ns = parent.GetNamespaceOfPrefix(prefix);
                return parent.Descendants(ns + localName).FirstOrDefault();
            }
            else
            {
                return parent.Descendants(tagName).FirstOrDefault();
            }
        }
        private bool IsValidRegex(string pattern)
        {
            if (string.IsNullOrWhiteSpace(pattern))
            {
                return false;
            }

            // Check if the pattern contains typical regex metacharacters
            if (!ContainsRegexMetaCharacters(pattern))
            {
                return false;
            }

            try
            {
                // Try to create a Regex object from the pattern
                Regex.Match(string.Empty, pattern);
            }
            catch (ArgumentException)
            {
                // If an ArgumentException is thrown, the pattern is not a valid regex
                return false;
            }

            return true;
        }
        private static bool ContainsRegexMetaCharacters(string pattern)
        {
            // List of common regex metacharacters
            string[] regexMetaCharacters = { ".", "^", "$", "*", "+", "?", "(", ")", "[", "]", "{", "}", "\\", "|" };

            foreach (var metaChar in regexMetaCharacters)
            {
                if (pattern.Contains(metaChar))
                {
                    return true;
                }
            }

            return false;
        }

        private string ExtractImageUrl(XElement parent, List<string> imageTags)
        {
            //Regex for UrlToImage!!
            //var checkRegex = new Regex(imageTags[1]);
            //var check = IsValidRegex(imageTags[1]);
            if (imageTags[1] != "")
            {
                if (!IsValidRegex(imageTags[1]))
                {
                    // Scenario 2: Single XML tag with attribute
                    var xmlTag = imageTags[0].Trim();

                    var xmlTagElement = FindElementByTagName(parent, xmlTag);

                    if (xmlTagElement != null)
                    {
                        var xmlAttribute = imageTags[1].Trim(); // Get the attribute name dynamically
                        var attributeValue = xmlTagElement.Attribute(xmlAttribute)?.Value ?? xmlTagElement.Value;

                        if (!string.IsNullOrEmpty(attributeValue))
                        {
                            return attributeValue;
                        }
                    }
                }
                else // if (imageTags.Count == 2 && !string.IsNullOrEmpty(imageTags[1].Trim()))
                {
                    // Scenario 3: Tag with regex
                    var xmlTag = imageTags[0].Trim();
                    var regexPattern = imageTags[1].Trim();

                    var xmlTagElement = FindElementByTagName(parent, xmlTag);

                    if (xmlTagElement != null)
                    {
                        var attributeValue = xmlTagElement.Attribute("url")?.Value ?? xmlTagElement.Value;

                        if (!string.IsNullOrEmpty(attributeValue))
                        {
                            var regex = new Regex(regexPattern, RegexOptions.IgnoreCase);
                            var match = regex.Match(attributeValue);

                            if (match.Success && match.Groups.Count > 1)
                            {
                                return match.Groups[1].Value;
                            }
                        }
                    }
                }
            }
            else // if (imageTags.Count == 1)
            {
                // Scenario 1: One XML tag
                var xmlTag = imageTags[0].Trim();
                //var xmlTag2 = imageTags[1].Trim();

                var xmlTagElement = FindElementByTagName(parent, xmlTag);
                //var xmlTagElement2 = FindElementByTagName(parent, xmlTag2);

                if (xmlTagElement != null)// && xmlTagElement2 != null)
                {
                    return xmlTagElement?.Value;// ?? xmlTagElement2.Value;
                }
            }

            return string.Empty;
        }

        private string ExtractImageUrl1(XElement parent, List<string> imageTags)
        {
            var regexPattern = imageTags[1].Trim();
            // Scenario 1: Two XML tags
            if (imageTags[1] == null)
            {
                var xmlTag = imageTags[0].Trim();
                var xmlTagElement = FindElementByTagName(parent, xmlTag);
            
                if (xmlTagElement != null)
                {
                    var attributeValue = xmlTagElement.Attribute("url")?.Value ?? xmlTagElement.Value;
                    return attributeValue;
                }
            }
            // Scenario 3: Tag with regex
            else if (!string.IsNullOrEmpty(regexPattern))
            {
                //var checkRegex = new Regex(regexPattern);
                var match1 = Regex.Match(imageTags[1], imageTags[1], RegexOptions.IgnoreCase);
                
                if (!match1.Success)
                {
                    // does not match
                    // Scenario 2: Single XML tag with attribute
                    var xmlTag = imageTags[0].Trim();
                    var xmlAttribute = imageTags[1].Trim();

                    var xmlTagElement = FindElementByTagName(parent, xmlTag);
                    //var xmlTagElement2 = FindElementByTagName(parent, xmlTag2);

                    if (xmlTagElement != null)// && xmlTagElement2 != null)
                    {
                        return xmlTagElement.Attribute(xmlAttribute)?.Value; // ?? xmlTagElement2.Value;
                    }
                }
                else
                {
                    // does match
                    // Scenario 3: Tag with regex
                    var xmlTag = imageTags[0].Trim();
                    //var regexPattern = imageTags[1].Trim();

                    var xmlTagElement = FindElementByTagName(parent, xmlTag);
                    if (xmlTagElement != null)
                    {
                        var attributeValue = xmlTagElement.Attribute("url")?.Value ?? xmlTagElement.Value;
                        if (!string.IsNullOrEmpty(attributeValue))
                        {
                            var regex = new Regex(regexPattern, RegexOptions.IgnoreCase);
                            var match = regex.Match(attributeValue);
                            if (match.Success && match.Groups.Count > 1)
                            {
                                return match.Groups[1].Value;
                            }
                        }
                    }
                }
                
            }
            // Scenario 2: Single XML tag with attribute
            else
            {
                //var xmlTag = imageTags[0].Trim();
                //var xmlAttribute = imageTags[1].Trim();

                //var xmlTagElement = FindElementByTagName(parent, xmlTag);
                ////var xmlTagElement2 = FindElementByTagName(parent, xmlTag2);

                //if (xmlTagElement != null)// && xmlTagElement2 != null)
                //{
                //    return xmlTagElement.Attribute(xmlAttribute)?.Value; // ?? xmlTagElement2.Value;
                //}
            }
            //foreach (var tag in imageTags)
            //{
            //    var parts = tag.Split(new [] { ',' }, 2); // Split into max 2 parts

            //    if (parts.Length == 2)
            //    {
            //        // Scenario 3: Tag with regex
            //        var xmlTag = parts[0].Trim();
            //        var regexPattern = parts[1].Trim();

            //        var xmlTagElement = FindElementByTagName(parent, xmlTag);
            //        if (xmlTagElement != null)
            //        {
            //            var attributeValue = xmlTagElement.Attribute("url")?.Value ?? xmlTagElement.Value;
            //            if (!string.IsNullOrEmpty(attributeValue))
            //            {
            //                var regex = new Regex(regexPattern, RegexOptions.IgnoreCase);
            //                var match = regex.Match(attributeValue);
            //                if (match.Success && match.Groups.Count > 1)
            //                {
            //                    return match.Groups[1].Value;
            //                }
            //            }
            //        }
            //    }
            //    else if (parts.Length == 1)
            //    {
            //        var xmlTag = parts[0].Trim();
            //        var xmlTagElement = FindElementByTagName(parent, xmlTag);
            
            //        if (xmlTagElement != null)
            //        {
            //            var attributeValue = xmlTagElement.Attribute("url")?.Value ?? xmlTagElement.Value;
            //            return attributeValue;
            //        }
            //    }
            //    else if (parts.Length == 2 && string.IsNullOrEmpty(parts[1].Trim()))
            //    {
            //        var xmlTag1 = parts[0].Trim();
            //        var xmlTag2 = parts[1].Trim();

            //        var xmlTagElement1 = FindElementByTagName(parent, xmlTag1);
            //        var xmlTagElement2 = FindElementByTagName(parent, xmlTag2);

            //        if (xmlTagElement1 != null && xmlTagElement2 != null)
            //        {
            //            return xmlTagElement1.Attribute(xmlTag2)?.Value ?? xmlTagElement2.Value;
            //        }
            //    }
            //}

            return string.Empty;
        }

        private string StripHtmlTags(string text, List<string> allowedTags = null)
        {
            if (allowedTags == null || allowedTags.Count == 0)
            {
                return Regex.Replace(text, "<.*?>", string.Empty);
            }

            var tagList = string.Join("|", allowedTags);
            var regex = new Regex($"<(?!/?(?:{tagList})\\b)[^>]*>", RegexOptions.IgnoreCase);
            return regex.Replace(text, string.Empty);
        }

        private string RemoveScriptTags(string xmlData)
        {
            return Regex.Replace(xmlData, "<script.*?</script>", "", RegexOptions.IgnoreCase | RegexOptions.Singleline);
        }
    }
}
