import { NewsService } from "../Modules/news-service.js";
import { Ads } from '../Modules/ads.js';

//debugger;
const adsInstance = new Ads();
//const apiService = new ApiService();
const newsService = new NewsService();
//newsService.initializeEventHandlers();
//#region Event Listeners - moved to NewsService
/*
document.getElementById('itemsPerPageDropdown').addEventListener('click', function()
{
    //debugger;
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
*/
//#endregion

window.newsService = newsService;
