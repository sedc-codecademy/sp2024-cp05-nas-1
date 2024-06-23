import { ApiService } from "../Modules/api-service.js";
import { NewsService } from "../Modules/news-service.js";
import '../Modules/ads.js';
// import { RenderFullStory } from "../Modules/render-full-story.js";
//debugger;

const apiService = new ApiService();
const newsService = new NewsService(apiService);

// const ads = new Ads();
// ads.displayAds();

document.getElementById("latest-news-btn").addEventListener("click", () => newsService.fetchLatestNews());
document.getElementById("oldest-news-btn").addEventListener("click", () => newsService.fetchOldestNews());

// Event listener for the "Archive" link
const archiveLink = document.getElementById('archive-link');
archiveLink.addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent default link behavior
    await newsService.archiveNews(); // Call archiveNews() to render archived content
});

window.newsService = newsService;
