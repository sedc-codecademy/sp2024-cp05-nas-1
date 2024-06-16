import { ApiService } from "./api-service.js";
import { News } from "./news.js";
import { Render } from "./render.js";

export class NewsService
{
  constructor(apiService)
  {
    this.apiService = apiService;
    this.notification = document.getElementById("notification");
    this.cardContainer = document.getElementById("cardContainer");
    this.fullStoryContainer = document.getElementById("fullStoryContainer");
    this.fullStoryContent = document.getElementById("fullStoryContent");

    this.testArray = [];
  }

  async mainNews()
  {
    try
    {
        const newsData = await this.apiService.fetchRssFeed();
        if(newsData.length === 0)
        {
            throw new Error("No news found! Try again");
        }
        //console.log("tuka");
        //console.log(newsData);
        const mappedNews = this.mapNewsData(newsData);
        this.testArray = mappedNews;
        //console.log("tuka");
        //console.log(this.testArray);
         Render.main(mappedNews, this.cardContainer);
    }
    catch (error)
    {
      this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
    }
  }

  mapNewsData(news)
  {
    return news.map((news) => new News(news))
  }

  viewFullStory(id)// ova moze i vo render da odi
  {
    const newsItem = this.testArray.find((item) => item.id === id);
    if (newsItem)
    {
      
      this.fullStoryContent.innerHTML = `
        <h2>${newsItem.title}</h2>
        <p><small>Published: ${new Date(newsItem.publishDate)}</small></p>
        <img src="${newsItem.urlToImage}" class="img-fluid mb-3" alt="${newsItem.title}">
        <p>${newsItem.description}</p>`;
      this.cardContainer.style.display = 'none';
      this.fullStoryContainer.style.display = 'block';
    }
  }

  hideFullStory()//isto moze vo render da odi
  {
    this.fullStoryContainer.style.display = 'none';
    this.cardContainer.style.display = 'block';
  }

  registerEvents()
  {
    console.log(`Event fired`);
    this.mainNews();
  }
}

// const newsService = new NewsService();
// export default newsService;