import { NewsService } from "../Modules/news-service.js";
import '../Modules/ads.js';
const newsService = new NewsService();
newsService.registerEvents();

