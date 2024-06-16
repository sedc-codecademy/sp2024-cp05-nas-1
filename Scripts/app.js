import { ApiService } from "../Modules/api-service.js";
import { NewsService } from "../Modules/news-service.js";
import '../Modules/ads.js';
//debugger;

const apiService = new ApiService();
const newsService = new NewsService(apiService);

// const ads = new Ads();
// ads.displayAds();

document.getElementById("latest-news-btn").addEventListener("click", () => newsService.fetchLatestNews());
document.getElementById("oldest-news-btn").addEventListener("click", () => newsService.fetchOldestNews());

window.newsService = newsService;
