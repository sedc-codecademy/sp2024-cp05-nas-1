import { RenderAds } from './render-ads.js';

// Example ad data
const ads = [
    { path: 'Media/adSample1.gif' },
    { path: 'Media/adSample2.gif' },
    { path: 'Media/adSample3.webp' },
    { path: 'Media/adSample4.gif' }
];

// IDs of the ad containers
const adContainerIds = ['left-ad-1', 'left-ad-2', 'right-ad-1', 'right-ad-2'];

// Function to shuffle ads
function shuffleAds() {
    // Shuffle the ad array
    for (let i = ads.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ads[i], ads[j]] = [ads[j], ads[i]];
    }
    // Render the shuffled ads
    RenderAds.main(ads, adContainerIds);
}

// Initial render
shuffleAds();

// Set interval to update ads every 30 seconds (30000 milliseconds)
setInterval(shuffleAds, 30000);