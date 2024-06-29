//import { ApiService } from "../Modules/api-service.js";
import { NewsService } from "../Modules/news-service.js";
import '../Modules/ads.js';
// import { RenderFullStory } from "../Modules/render-full-story.js";
// debugger;

//const apiService = new ApiService();
const newsService = new NewsService();

// const ads = new Ads();
// ads.displayAds();

document.getElementById("latest-news-btn").addEventListener("click", () => newsService.fetchLatestNews());
document.getElementById("oldest-news-btn").addEventListener("click", () => newsService.fetchOldestNews());

document.getElementById('itemsPerPageDropdown').addEventListener('click', function()
{
    debugger;
    if (event.target.classList.contains('dropdown-item'))
    {
        const itemsPerPage = parseInt(event.target.getAttribute('data-value'));
        newsService.updateItemsPerPage(itemsPerPage);
    }
});

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
layoutDropdown.addEventListener('click', function(event)
{
    if (event.target.classList.contains('dropdown-item'))
    {
        const layoutType = event.target.getAttribute('data-value');
        setCardLayout(layoutType);
    }
});
// Event listener for the "Archive" link
const archiveLink = document.getElementById('archive-link');
archiveLink.addEventListener('click', async function(event)
{
    event.preventDefault(); // Prevent default link behavior
    await newsService.archiveNews(); // Call archiveNews() to render archived content
});

window.newsService = newsService;
