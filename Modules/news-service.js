import { ApiService } from "./api-service.js";
import { News } from "./news.js";
import { RenderFullStory } from "./render-full-story.js";
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

        // Fetch news immediately
        this.mainNews();
    }

    async mainNews()
    {
        //debugger;
        try
        {
            const newsData = await this.apiService.fetchAllNews();
            if (newsData.length === 0)
            {
                throw new Error("No news found! Try again");
            }
            //debugger;
            const mappedNews = this.mapNewsData(newsData);
            this.testArray = mappedNews;
            const mappedNewsJson = JSON.stringify(newsData, null, 2); // Convert to JSON with indentation
            console.log("Mapped News JSON:", mappedNewsJson); // Log as JSON
            console.log("Fetched News:", mappedNews[1]);
            //console.log("mappedNews News:", mappedNews);
            //console.log("testArray News:", testArray);
            Render.main(mappedNews, this.cardContainer);
        }
        catch (error)
        {
            this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
        }
    }

    //add Id in front of every item.
    //TO-DO: read the last Id from the json (json.lenght) and contiue from there
    mapNewsData(news)
    {
        return news.map((newsItem, index) => new News({ ...newsItem, id: index }));
    }

    async viewFullStory(id)
    {
        try
        {
            debugger;
            const newsItem = await this.testArray.find(item => item.id === id);
            if (newsItem)
            {
                this.cardContainer.style.display = 'none';
                this.fullStoryContainer.style.display = 'block';
                RenderFullStory.fullStory(newsItem, fullStoryContent);
            }
            else
            {
                console.error('News item not found');
            }
        }
        catch (error)
        {
            console.error('Error viewing full story:', error);
        }
    }

    hideFullStory()
    {
        this.fullStoryContainer.style.display = 'none';
        this.cardContainer.style.display = 'block';
    }
}
