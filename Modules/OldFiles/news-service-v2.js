import { fetchRss, parseRss } from "./api-service.js"; // Import fetchRss and parseRss functions
import { News } from "./news.js";
import { Render } from "./render.js";

export class NewsService {
    constructor() {
        this.notification = document.getElementById("notification");
        this.cardContainer = document.getElementById("cardContainer");
        this.fullStoryContainer = document.getElementById("fullStoryContainer");
        this.fullStoryContent = document.getElementById("fullStoryContent");
        this.testArray = [];
    }

    async mainNews(rssUrl) {
        try {
            const xml = await fetchRss(rssUrl); // Fetch RSS feed using fetchRss function
            if (!xml) {
                throw new Error("No data received from RSS feed!");
            }
            const newsData = parseRss(xml); // Parse RSS XML data to extract news
            if (newsData.length === 0) {
                throw new Error("No news found in RSS feed!");
            }
            const mappedNews = this.mapNewsData(newsData); // Map parsed news data to News objects
            this.testArray = mappedNews;
            Render.main(mappedNews, this.cardContainer); // Render news on UI
        } catch (error) {
            console.error("Error fetching or processing news:", error);
            this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
        }
    }

    mapNewsData(news) {
        return news.map((item, index) => new News({
            id: index + 1, // Generate unique IDs or use item.guid if available in RSS feed
            title: item.title,
            description: item.description,
            url: item.link,
            author: item.author,
            publishDate: new Date(item.pubDate),
            urlToImage: item.enclosure
        }));
    }

    viewFullStory(id) {
        const newsItem = this.testArray.find((item) => item.id === id);
        if (newsItem) {
            this.fullStoryContent.innerHTML = `
                <h2>${newsItem.title}</h2>
                <p><small>Published: ${newsItem.publishDate.toLocaleDateString()}</small></p>
                <img src="${newsItem.urlToImage}" class="img-fluid mb-3" alt="${newsItem.title}">
                <p>${newsItem.description}</p>`;
            this.cardContainer.style.display = "none";
            this.fullStoryContainer.style.display = "block";
        }
    }

    hideFullStory() {
        this.fullStoryContainer.style.display = "none";
        this.cardContainer.style.display = "block";
    }

    registerEvents() {
        console.log(`Event fired`);
    }
}
