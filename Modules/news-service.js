import { ApiService } from "./api-service.js";
import { News } from "./news.js";
import { RenderFullStory } from "../Renders/render-full-story.js";
import { Render } from "../Renders/render.js";
import { PaginationService } from "./pagination-service.js";

export class NewsService
{
    constructor()
    {
        this.apiService = new ApiService();
        this.paginationService = new PaginationService(this);
        this.notification = document.getElementById("notification");
        this.cardContainer = document.getElementById("cardContainer");
        this.fullStoryContainer = document.getElementById("fullStoryContainer");
        this.fullStoryContent = document.getElementById("fullStoryContent");
        this.cardContainerArchive = document.getElementById("cardContainerArchive");
        this.notificationArchive = document.getElementById("notificationArchive");

        this.paginationContainer = document.getElementById('paginationContainer');
        this.paginationContainerArchive = document.getElementById('paginationContainerArchive');

        this.dropdownItems = document.getElementById('dropdownItems');

        this.newsArray = [];
        this.mappedNews = [];

        this.currentPage = this.paginationService.currentPage; // Current page
        this.itemsPerPage = this.paginationService.itemsPerPage; // Number of news items per page

        //debugger;
        // Fetch news immediately
        this.mainNews();
    }

    initializeEventHandlers()
    {
        // Event listener for items per page dropdown
        document.getElementById('itemsPerPageDropdown').addEventListener('click', (event) =>
        {
            if (event.target.classList.contains('dropdown-item'))
            {
                const itemsPerPage = parseInt(event.target.getAttribute('data-value'));
                this.updateItemsPerPage(itemsPerPage);
            }
        });

        // Function to set card layout - to be fixed using bootstrap
        function setCardLayout(layoutType)
        {
            const cardContainer = document.getElementById('cardContainer');
            cardContainer.className = ''; // Clear existing classes
            switch (layoutType)
            {
                case 'single':
                    cardContainer.classList.add('card-single');
                    break;
                case 'triple':
                    cardContainer.classList.add('card-triple');
                    break;
                default:
                    cardContainer.classList.add('card-single');
                    break;
            }
        }

        // Set default layout
        setCardLayout('single');

        // Event listener for the "Card Layout" dropdown
        const layoutDropdown = document.getElementById('layoutDropdown');
        layoutDropdown.addEventListener('click', (event) =>
        {
            debugger;
            if (event.target.classList.contains('dropdown-item'))
            {
                const layoutType = event.target.getAttribute('data-value');
                setCardLayout(layoutType);
            }
        });

        // Event listener for the "Archive" link
        const archiveLink = document.getElementById('archive-link');
        archiveLink.addEventListener('click', async (event) =>
        {
            event.preventDefault(); // Prevent default link behavior
            await this.archiveNews(); // Call archiveNews() to render archived content
        });
    }

    async mainNews()
    {
        try
        {
            const newsData = await this.apiService.fetchRssFeed();
            if (newsData.length === 0)
            {
                throw new Error("No news found! Try again");
            }

            //Sort the news by date before adding ID - this can help sort the archive by ID
            const sortedNews = newsData.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
            this.mappedNews = this.mapNewsData(sortedNews);
            
            this.newsArray = this.mappedNews;
            this.currentPage = 1; // Start from the first page
            this.renderPage(this.currentPage, this.cardContainer, this.newsArray); // Render the first page
        }
        catch (error)
        {
            this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
        }
    }

    //add Id in front of every item.
    mapNewsData(news)
    {
        return news.map((newsItem, index) => new News({ ...newsItem, id: index }));
    }

    async archiveNews()
    {
        //debugger;
        this.cardContainer.innerHTML = "";

        this.newsArray.sort((a, b) => b.id - a.id);

        this.currentPage = 1; // Start from the first page
        this.renderPage(this.currentPage, this.cardContainer, this.newsArray); // Render the first page

    }

    //Pagination
    //https://webdesign.tutsplus.com/pagination-with-vanilla-javascript--cms-41896t
    renderPage(page, container = this.cardContainer, newsData = this.newsArray)
    {
        //debugger;
        const start = (page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const newsToRender = newsData.slice(start, end);
        Render.main(newsToRender, container);
        this.paginationService.renderPagination();
    }

    async viewFullStory(id)
    {
        try
        {
            const newsItem = await this.newsArray.find(item => item.id === id);
            if (newsItem)
            {
                
                this.cardContainer.style.display = 'none';
                this.fullStoryContainer.style.display = 'block';
                this.hideElements();
                RenderFullStory.fullStory(newsItem, this.fullStoryContent);
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
        this.showElements();
    }

    hideElements()
    {
        this.paginationContainer.style.visibility = 'hidden';
        this.paginationContainerArchive.style.visibility = 'hidden';
        this.dropdownItems.style.visibility = 'hidden';
    }

    showElements()
    {
        this.paginationContainer.style.visibility = 'visible';
        this.paginationContainerArchive.style.visibility = 'visible';
        this.dropdownItems.style.visibility = 'visible';
    }

    updateItemsPerPage(itemsPerPage)
    {
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1; // Reset to first page when items per page changes
        this.renderPage(this.currentPage); // Re-render the page
    }
}
