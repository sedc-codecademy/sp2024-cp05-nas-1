using DomainModels;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Xml.Linq;

namespace NewsAggregatorRSSFeed.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsControllerOld : ControllerBase
    {
        private readonly RssService _rssService;

        public NewsControllerOld(RssService rssService)
        {
            _rssService = rssService;
        }

        [HttpGet("FetchRssFeeds")]
        public async Task<IActionResult> FetchRssFeeds()
        {
            var urls = new List<UrlConfigOld>
            {
                //new UrlConfigOld
                //{
                //    Source = "MIA",
                //    FeedUrl = "https://mia.mk/feed",
                //    Title = "title",
                //    Description = "description",
                //    Link = "link",
                //    Author = "author",
                //    PubDate = "pubDate",
                //    UrlToImage = new UrlToImageConfig { Query = "enclosure", Attribute = "url" }
                //},
                new UrlConfigOld
                {
                    Source = "Telma",
                    FeedUrl = "https://telma.com.mk/feed/",
                    Title = "title",
                    Description = "content:encoded",
                    Link = "link",
                    Author = "dc:creator",
                    PubDate = "pubDate",
                    UrlToImage = new UrlToImageConfig
                        { Query = "content\\:encoded, encoded", Regex = "/<img[^>]*src=\"([^\"]*)\"/i" }
                },
                //new UrlConfigOld
                //{
                //    Source = "Telma",
                //    FeedUrl = "https://telma.com.mk/feed/",
                //    Title = "title",
                //    Description = "content:encoded",
                //    Link = "link",
                //    Author = "dc:creator",
                //    PubDate = "pubDate",
                //    UrlToImage = new UrlToImageConfig { Query = @"content\\\\:encoded", Attribute = "/<img[^>]*src=\"([^\"]*)\"/i" }
                //},
                //new UrlConfigOld
                //{
                //    Source = "24Vesti",
                //    FeedUrl = "https://admin.24.mk/api/rss.xml",
                //    Title = "title",
                //    Description = "content",
                //    Link = "link",
                //    Author = "dc:creator",
                //    PubDate = "pubDate",
                //    UrlToImage = new UrlToImageConfig { Query = @"img", Attribute = "src" },
                //},
                //new UrlConfigOld
                //{
                //    Source = "Sitel",
                //    FeedUrl = "https://sitel.com.mk/rss.xml",
                //    Title = "title",
                //    Description = "description",
                //    Link = "link",
                //    Author = "dc:creator",
                //    PubDate = "pubDate",
                //    UrlToImage = new UrlToImageConfig { Query = @"description", Attribute = "/<img[^>]*src=\"([^\"]*)\"/i" }
                //},
                //new UrlConfigOld
                //{
                //    Source = "Kanal5",
                //    FeedUrl = "https://kanal5.com.mk/rss.aspx",
                //    Title = "title",
                //    Description = "content",
                //    Link = "link",
                //    Author = "author",
                //    PubDate = "pubDate",
                //    UrlToImage = new UrlToImageConfig {  Query = "thumbnail", Attribute = "" }
                //}
                // Add other URLs here as needed
            };

            var articles = await _rssService.FetchAndParseRssFeedsAsync(urls);
            return Ok(articles);
        }
    }
}