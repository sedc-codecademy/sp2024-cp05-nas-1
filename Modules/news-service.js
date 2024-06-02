import { ApiService } from "./api-service.js";
import { News } from "./news.js";
import { Render } from "./render.js";
export class NewsService
{
  constructor()
  {
    this.apiService = new ApiService();
    this.notification = document.getElementById("notification");
    this.cardContainer = document.getElementById("cardContainer");

    this.testArray = [];
  }

  async mainNews(newsData)
  {
    try
    {
        newsData = await this.apiService.fetchNews();
        if(newsData.length === 0)
            {
                throw new Error("No news found! Try again");
            }
            console.log("tuka");
            //console.log(newsData);
            const mappedNews = this.mapNewsData(newsData);
            this.testArray = mappedNews;
            console.log("tuka");
            console.log(this.testArray);
            Render.main(newsData, this.cardContainer);
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

  registerEvents()
  {
    console.log(`Event fired`);
    this.mainNews();
  }
}