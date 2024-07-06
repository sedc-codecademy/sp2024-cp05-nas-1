//import { getQueryParams } from "./full-story.js";
export class ApiService
{
    constructor()
    {
 //#region This will be used if the backend is not available
/*
        this.urls = [
        {
            source: 'MIA',
            feedUrl: 'https://mia.mk/feed',
            title: 'title',
            description: 'description',
            link: 'link',
            author: 'author',
            pubDate: 'pubDate',
            urlToImage: { query: 'enclosure', attribute: 'url' }
        },
        {
            source: 'Telma',
            feedUrl: 'https://telma.com.mk/feed/',
            title: 'title',
            description: 'content:encoded',
            link: 'link',
            author: 'dc:creator',
            pubDate: 'pubDate',
            urlToImage: { query: 'content\\:encoded, encoded', regex: /<img[^>]*src="([^"]*)"/i }
        },
        {
            source: '24 Vesti',
            feedUrl: 'https://admin.24.mk/api/rss.xml',
            title: '',
            description: 'content',
            link: 'link',
            author: 'author',
            pubDate: 'pubDate',
            urlToImage:  { query: 'img', attribute: 'src' }
        },
        {
            source: 'Sitel',
            feedUrl: 'https://sitel.com.mk/rss.xml',
            title: 'title',
            description: 'description',
            link: 'link',
            author: 'dc:creator',
            pubDate: 'pubDate',
            urlToImage: { query: 'description', regex: /<img[^>]*src="([^"]*)"/i }
        },
        {
            source: 'Kanal5',
            feedUrl: 'https://kanal5.com.mk/rss.aspx',
            title: 'title',
            description: 'content',
            link: 'link',
            author: '',
            pubDate: 'pubDate',
            urlToImage: { query: 'thumbnail' }
        }];
*/
//#endregion
        this.jsonUrl = 
        {
            0: 'https://localhost:5002/News',
            1: 'https://dnisko.ddns.net:5002/News'
        }
    }
    
    async fetchRssFeed()
    {
        try
        {
            let response;
            try
            {
                response = await fetch(this.jsonUrl[0]);
                console.log(response);
                if(!response.ok)
                {
                    console.warn(`Failed to fetch from ${this.jsonUrl[0]} with status ${response.status}`);
                    throw new Error(`Failed to fetch from ${this.jsonUrl[0]}`);
                }
            }
            catch(error)
            {
                console.warn(`First fetch attempt failed: ${error.message}`);
                response = await fetch(this.jsonUrl[1]);
                
                if (!response.ok)
                {
                    console.error(`Failed to fetch from ${this.jsonUrl[1]} with status ${response.status}`);
                    throw new Error(`Failed to fetch from ${this.jsonUrl[1]}`);
                }
            }
            console.log(response);
            const jsonData = await response.json();
            console.log(jsonData);
            return jsonData;

            /* //THIS WILL BE USED WHEN THE BACKEND IS NOT AVAILABLE
            // const responses = await Promise.all(this.urls.map(urlConfig => fetch(urlConfig.feedUrl)));
            // const xmlData = await Promise.all(responses.map(response => response.text()));

            // const allArticles = [];
            // for (let i = 0; i < xmlData.length; i++)
            // {
            //     const parsedArticles = this.parseRss(xmlData[i], this.urls[i]);
            //     allArticles.push(...parsedArticles);
            // }

            // console.log(allArticles);
            // return allArticles;
            */
        }
        catch (error)
        {
            console.error('Error fetching RSS feed:', error);
            return [];
        }
    }

//#region If there is a need to fetch JSON data + XML data from frontend, we use this
/*  //Fetch JSON data from url OR path to file
    async fetchJsonData()
    {
        try
        {
            const response = await fetch(this.jsonUrl);
            if (!response.ok) 
            {
                throw new Error('Failed to fetch JSON data');
            }
            const jsonData = await response.json();
            console.log('Fetched JSON data:', jsonData);
            return jsonData;
        }
        catch (error)
        {
            console.error('Error fetching JSON data:', error);
            return [];
        }
    }
*/
/*  //Fetch all news from RSS feed and JSON data
    async fetchAllNews()
    {
        try
        {
            const [rssData, jsonData] = await Promise.all([
                this.fetchRssFeed(),
                this.fetchJsonData()
            ]);

            const mergedData = this.deDuplicateNews([...rssData, ...jsonData]);
            console.log('Merged and deduplicated news data:', mergedData);
            return mergedData;
        }
        catch (error)
        {
            console.error('Error fetching all news:', error);
            return [];
        }
    }
*/
    //obsolite code once the backend is available
/*  //Distinct articles based on title, publish date, and source form the RSS feed and the JSON data
    deDuplicateNews(newsData)
    {
        
        const uniqueArticles = [];
        const seenArticles = new Set();
    
        for (const article of newsData)
        {
            const uniqueKey = `${article.title}-${article.publishDate}-${article.source}`;
            if (seenArticles.has(uniqueKey))
            {
                continue; // Skip the rest of the loop if a duplicate is found
            }
            seenArticles.add(uniqueKey);
            uniqueArticles.push(article);
        }
    
        return uniqueArticles;
    }
*/

//obsolite code once the backend is available
/*  //parses the RSS feed and returns an array of articles
    
    parseRss(xml, urlConfig)
    {
        const filteredXml = xml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(filteredXml, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        const articles = [];

        for (let i = 0; i < items.length; i++)
        {
            const item = items[i];
            if (item.getElementsByTagName('script').length > 0)
            {
                continue;
            }
            //debugger;
            //console.log(urlConfig);
            const title = this.getElementText(item, urlConfig.title);
            let description = this.stripHtmlTags(this.getElementText(item, urlConfig.description));
            const url = this.getElementText(item, urlConfig.link);
            const author = this.getElementText(item, urlConfig.author);
            const publishDate = this.getElementText(item, urlConfig.pubDate);
            const urlToImage = this.getEnclosureUrl(item, urlConfig.urlToImage);

            articles.push(
            {
                title,
                description,
                url,
                author,
                publishDate,
                urlToImage
            });
        }
        console.log("Articles");
        console.log(articles);
        return articles;
    }
*/

//obsolite code once the backend is available
/*  //Stripping the HTML tags from the fetched RSS feed
    stripHtmlTags(text, allowedTags = [])
    {
        if (allowedTags.length === 0)
        {
            return text.replace(/<\/?[^>]+(>|$)/g, '');
        }
        
        const tagList = allowedTags.join('|');
        const regex = new RegExp(`<(?!\/?(?:${tagList})\\b)[^>]*>`, 'gi');
        return text.replace(regex, '');
    }
*/

//obsolite code once the backend is available
/*  //Get the text content of an element in the XML
    getElementText(parent, tagName)
    {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent.trim() : '';
    }
*/

//obsolite code once the backend is available
/*  //Get the enclosure (img) URL of an item in the XML
    getEnclosureUrl(item, imageConfig)
    {
        const element = item.querySelector(imageConfig.query);
        if (element)
        {
            if (imageConfig.attribute)
            {
                return element.getAttribute(imageConfig.attribute) || '';
            }
            if (imageConfig.regex)
            {
                const match = imageConfig.regex.exec(element.textContent);
                if (match && match[1])
                {
                    return match[1];
                }
            }
            // Directly return the text content if no attribute or regex is specified
            return element.textContent.trim();
        }
        return '';
    }
*/
//#endregion

/*   //TEST CODE
    getEnclosureUrl2(item)
    {
        // Debugging and logging
        //debugger;
        console.log(item);

        // Check for enclosure tag first
        const enclosureElement = item.querySelector('enclosure');
        if (enclosureElement)
        {
            const enclosureUrl = enclosureElement.getAttribute('url');
            if (enclosureUrl)
            {
                return enclosureUrl;
            }
        }

        const imgElement = item.querySelector('img');
        if (enclosureElement)
        {
            const enclosureUrl = enclosureElement.getAttribute('src');
            if (enclosureUrl)
            {
                return enclosureUrl;
            }
        }

        // If no enclosure tag is found, check for content:encoded
        const contentEncodedElement = item.querySelector('content\\:encoded, encoded');
        if (contentEncodedElement)
        {
            const contentEncoded = contentEncodedElement.textContent;
            const imgTagRegex = /<img[^>]*src="([^"]*)"/i;
            const match = imgTagRegex.exec(contentEncoded);
            if (match && match.length > 1)
            {
                return match[1]; // This will be the URL from the src attribute of the img tag
            }
        }

        // Return an empty string if no URL is found
        return '';
        // debugger;
        // console.log(item);
        // console.log(item.lastElementChild.enclosure.url);
        // const contentEncoded = item.querySelector('content\\:encoded, encoded').textContent ?
        //                        item.querySelector('content\\:encoded, encoded').textContent : item.getElementsByTagName("enclosure").textContent;
        
        // const imgTagRegex = /<img[^>]*src="([^"]*)"/i;
        // const match = imgTagRegex.exec(contentEncoded);
        // if (match && match.length > 1)
        // {
        //     return match[1]; // This will be the URL from the src attribute of the img tag
        // }
        // return '';
    }
*/

/*   //TEST CODE
    getEnclosureUrl1(item)
    {
        const contentEncoded = item.getElementsByTagName('content:encoded')[0];
        if (contentEncoded)
        {
            const enclosureMatch = contentEncoded.textContent.match(/<enclosure\s+url="([^"]+)"/);
            if (enclosureMatch)
            {
                return enclosureMatch[1];
            }
        }
        return '';
    }
*/

/*   //TEST CODE
    filterNewsByQuery(newsData, queryParams)
    {
        if (queryParams.id)
        {
            return newsData.filter(article => article.id.toString() === queryParams.id);
        }
        return newsData;
    }
*/
}
