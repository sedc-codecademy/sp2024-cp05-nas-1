import { ApiService } from "../Modules/api-service.js";
import { NewsService } from "../Modules/news-service.js";
import '../Modules/ads.js';
//debugger;
const urls =[
    //'https://mia.mk/feed',
    'https://telma.com.mk/feed/'];

const apiService = new ApiService();
const newsService = new NewsService(apiService);

// const ads = new Ads();
// ads.displayAds();

window.newsService = newsService;
