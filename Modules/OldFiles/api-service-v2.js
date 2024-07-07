import { xmlToJson } from "./xmlToJson.js";

export class ApiService
{
    constructor(urls)
    {
        this.urls = urls;
    }
    
    async fetchRssFeed()
    {
        debugger;
        const allArticles = [];
        for(const url of this.urls)
        {
            console.log(`url na red: ${url}`)
            try
            {
                const response = await fetch(url);
                if(!response.ok)
                {
                    throw new Error(`HTTP ERROR. Status: ${response.status}`);
                }
                const text = await response.text();
                console.log(text);
                const parse = new DOMParser();
                const xml = parse.parseFromString(text, "application/xml");
                const json = xmlToJson(xml);
                const articles = this.parseRssFeed(json);
                allArticles.push(...articles);
            }
            catch (error)
            {
                console.error(`Error fetching RSS feed from ${url}:`, error);
            }
        }
        return allArticles;
        
        // const response = await fetch(this.baseUrl);
        // if(!response.ok)
        // {
        //     throw new Error(`HTTP ERROR. Status: ${response.status}`);
        // }
        
        // const data = await response.json();
        // console.log(data);
        // return data.articles;
    }

    // parseRssFeed(xml)
    // {
    //     const items = xml.querySelectorAll('item');
    //     let articles = [];
    //     let id = 1;
    //     //debugger;
    //     items.forEach(item =>
    //     {
    //         const title = item.querySelector('title').textContent;
    //         const description = item.querySelector('description').textContent;
    //         const url = item.querySelector('link').textContent;
    //         const author = item.querySelector('author') ? item.querySelector('author').textContent : 'Unknown';
    //         const publishDate = item.querySelector('pubDate').textContent;
    //         //const guid = item.querySelector('guid').textContent;
    //         //const fullStory = item.querySelector('content:encoded') ? item.querySelector('content:encoded').textContent : description; // Assume full story is in content:encoded
    //         const urlToImage = item.querySelector('media\\:content, enclosure') ? item.querySelector('media\\:content, enclosure').getAttribute('url') : ''; // Adjust selector based on RSS feed structure

    //         //add Id number for every article - this way we can add the Id of the article to the button for the link
    //         articles.push({ id: id++, title, url, description, publishDate, author, urlToImage });
    //     });

    //     return articles;
    // }

    parseRssFeed(json)
    {
        const items = json.rss.channel.item;
        let articles = [];
        let id = 1;

        items.forEach(item =>
        {
            const title = item.title["#text"];
            const description = item.description["#text"];
            const url = item.link["#text"];
            const author = item.author ? item.author["#text"] : 'Unknown';
            const publishDate = item.pubDate["#text"];
            const urlToImage = item.enclosure ? item.enclosure["@attributes"].url : '';
    
            articles.push({ id: id++, title, url, description, publishDate, author, urlToImage });
        });
        return articles;
    }
}

{/* <item>
        <title></title>
        <description></description>
        <link></link> //LINK
        <author>Сашо</author>
        <guid></guid> //LINK
        <pubDate>Sat, 08 Jun 2024 20:32:44 +0200</pubDate> /DATE
        <enclosure url="https://mia.mk/images/20240608203244_ogImage_68.jpg"/> //IMG
</item> */}