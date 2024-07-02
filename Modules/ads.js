import { RenderAds } from '../Renders/render-ads.js';

export class Ads
{
    constructor()
    {
        // Example ad data
        this.ads =
        [
            { path: 'Media/adSample1.gif' },
            { path: 'Media/adSample2.gif' },
            { path: 'Media/adSample3.webp' },
            { path: 'Media/adSample4.gif' }
        ];
        
        // IDs of the ad containers
        this.adContainerIds = ['left-ad-1', 'left-ad-2', 'right-ad-1', 'right-ad-2'];

        this.shuffleAds = this.shuffleAds.bind(this); // Bind shuffleAds here

        // Initial render
        this.shuffleAds();
        // Set interval to update ads every 30 seconds
        setInterval(this.shuffleAds, 30000);
    }
    // Function to shuffle ads
    shuffleAds()
    {
        // Shuffle the ad array
        for (let i = this.ads.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [this.ads[i], this.ads[j]] = [this.ads[j], this.ads[i]];
        }
        // Render the shuffled ads
        RenderAds.main(this.ads, this.adContainerIds);
    }
}