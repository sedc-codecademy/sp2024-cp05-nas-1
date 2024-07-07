import { RenderAds } from '../Renders/render-ads.js';

export class Ads
{
    constructor()
    {
        this.ads =
        [
            { path: 'Media/adSample1.gif' },
            { path: 'Media/adSample2.gif' },
            { path: 'Media/adSample3.webp' },
            { path: 'Media/adSample4.gif' }
        ];
        
        this.adContainerIds = ['left-ad-1', 'left-ad-2', 'right-ad-1', 'right-ad-2'];

        this.shuffleAds = this.shuffleAds.bind(this);

        this.shuffleAds();

        setInterval(this.shuffleAds, 30000);
    }

    shuffleAds()
    {
        for (let i = this.ads.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [this.ads[i], this.ads[j]] = [this.ads[j], this.ads[i]];
        }

        RenderAds.main(this.ads, this.adContainerIds);
    }
}