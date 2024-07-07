import { NewsService } from "../Modules/news-service.js";
import { Ads } from '../Modules/ads.js';

//debugger;
const adsInstance = new Ads();
const newsService = new NewsService();

window.newsService = newsService;
