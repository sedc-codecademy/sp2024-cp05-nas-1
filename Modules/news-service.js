import { ApiService } from "./api-service.js";
import { News } from "./news.js";
import { RenderFullStory } from "./render-full-story.js";
import { Render } from "./render.js";
import { RenderArchive } from "./render-archive.js";

export class NewsService
{
    constructor(apiService)
    {
        this.apiService = apiService;
        this.notification = document.getElementById("notification");
        this.cardContainer = document.getElementById("cardContainer");
        this.fullStoryContainer = document.getElementById("fullStoryContainer");
        this.fullStoryContent = document.getElementById("fullStoryContent");
        this.cardContainerArchive = document.getElementById("cardContainerArchive");
        this.notificationArchive = document.getElementById("notificationArchive");

        this.paginationContainer = document.getElementById('paginationContainer');
        this.paginationContainerArchive = document.getElementById('paginationContainerArchive');

        this.testArray = [];

        this.currentPage = 1; // Current page
        this.itemsPerPage = 3; // Number of news items per page

        //debugger;
        // Fetch news immediately
        this.mainNews();
    }

    async mainNews()
    {
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
            this.currentPage = 1; // Start from the first page
            this.renderPage(this.currentPage); // Render the first page
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

    async archiveNews()
    {
        
        //debugger;
        //READ FROM JSON FILE ORDERED BY DATE DESCENDING
        // try
        // {
        //     const archivedNewsData = await this.apiService.fetchArchivedNews();
        //     if (archivedNewsData.length === 0)
        //     {
        //         throw new Error("No archived news found!");
        //     }
        //     const mappedArchivedNews = this.mapNewsData(archivedNewsData);
        //     this.testArray = mappedArchivedNews;
        //     this.renderPage(this.currentPage, this.cardContainerArchive); // Render the first page of archive
        //     }
        //     catch (error)
        //     {
        //         this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
        //     }
        // }
        // try
        // {
        //     const newsData = await this.apiService.fetchAllNews();
        //     if (newsData.length === 0)
        //     {
        //         throw new Error("No news found! Try again");
        //     }
        //     //debugger;
        //     const mappedNews = this.mapNewsData(newsData);
        //     this.testArray = mappedNews;
        //     const mappedNewsJson = JSON.stringify(newsData, null, 2); // Convert to JSON with indentation
        //     console.log("Mapped News JSON:", mappedNewsJson); // Log as JSON
        //     console.log("Fetched News:", mappedNews[1]);
        //     //console.log("mappedNews News:", mappedNews);
        //     //console.log("testArray News:", testArray);
        //     Render.main(mappedNews, this.cardContainer);
        // }
        // catch (error)
        // {
        //     this.notification.innerHTML = `<div class='alert-danger'>${error.message}</div>`;
        // }
        console.log(this.testArray);
        console.log(this.cardContainer);
        // this.cardContainer.style.display = 'none';
        // this.cardContainerArchive.style.display = 'block';
        //this.cardContainer.innerHTML = '';
        RenderArchive.main(this.testArray, this.cardContainer); // or this.cardContainerArchive
    }
    //Pagination
    //https://webdesign.tutsplus.com/pagination-with-vanilla-javascript--cms-41896t
    renderPage(page, container = this.cardContainer, paginationContainerId = 'paginationContainer')
    {
        const start = (page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const newsToRender = this.testArray.slice(start, end);
        Render.main(newsToRender, cardContainer);
        this.renderPagination(paginationContainerId);
    }

    renderPagination(paginationContainerId = 'paginationContainer')
    {
        const totalPages = Math.ceil(this.testArray.length / this.itemsPerPage);
        const currentPage = this.currentPage;
        const pageRange = 3; // Number of pages to show in the middle range
        let paginationHTML = `<nav aria-label="Page navigation example"><ul class="pagination justify-content-center">`;
    
        // Previous Button
        paginationHTML += `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage - 1}" tabindex="-1">Previous</a>
            </li>`;
    
        // First Page
        if (currentPage > pageRange + 1)
        {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" data-page="1">1</a>
                </li>
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">...</a>
                </li>`;
        }
    
        // Middle Pages
        const startPage = Math.max(1, currentPage - pageRange);
        const endPage = Math.min(totalPages, currentPage + pageRange);
    
        for (let i = startPage; i <= endPage; i++)
        {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>`;
        }
    
        // Last Page
        if (currentPage < totalPages - pageRange)
        {
            paginationHTML += `
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">...</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
                </li>`;
        }
    
        // Next Button
        paginationHTML += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
            </li>
        </ul></nav>`;
    
        const paginationContainer = document.getElementById(paginationContainerId);
        paginationContainer.innerHTML = paginationHTML;
        this.addPaginationEventListeners(paginationContainer);
    }

    addPaginationEventListeners(container = this.cardContainer)
    {
        container.querySelectorAll('.page-link').forEach(button =>
        {
            button.addEventListener('click', (event) =>
            {
                event.preventDefault();
                const page = parseInt(event.target.getAttribute('data-page'));
                if (page > 0 && page <= Math.ceil(this.testArray.length / this.itemsPerPage))
                {
                    this.currentPage = page;
                    this.renderPage(page, container.parentElement.previousElementSibling, container.id);
                }
            });
        });
    }

    async viewFullStory(id)
    {
        try
        {
            const newsItem = await this.testArray.find(item => item.id === id);
            if (newsItem)
            {
                
                this.cardContainer.style.display = 'none';
                this.fullStoryContainer.style.display = 'block';
                this.hidePagination();
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
        this.showPagination();
    }

    hidePagination()
    {
        this.paginationContainer.style.visibility = 'hidden';
        this.paginationContainerArchive.style.visibility = 'hidden';
    }

    showPagination()
    {
        this.paginationContainer.style.visibility = 'visible';
        this.paginationContainerArchive.style.visibility = 'visible';
    }
}
