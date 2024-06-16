export class ApiService
{
    constructor(urls) 
    {
        this.urls =
        [
            {
                source: 'mia',
                feedUrl: 'https://mia.mk/feed',
                title: 'title',
                description: 'description',
                link: 'link',
                author: 'author',
                pubDate: 'pubDate'
                //enclosure
            },
            {
                source: 'telma',
                feedUrl: 'https://telma.com.mk/feed/',
                title: 'title',
                description: 'content:encoded',
                link: 'link',
                author: 'dc:creator',
                pubDate: 'pubDate'
            }
        ]
    }

    

    async fetchRssFeed()
    {
        debugger;
        console.log(this.urls);
        try
        {
            const responses = await Promise.all(this.urls.map(urls => fetch(urls.feedUrl)));
            const xmlData = await Promise.all(responses.map(response => response.text()));
            const parsedData = xmlData.flatMap(xml => this.parseRss(xml)); // Use flatMap to flatten the array of arrays
            const json = xmlToJson(parsedData);
                const articles = this.parseRssFeed(json);
                allArticles.push(...articles);
            return allArticles;
        }
        catch (error)
        {
            console.error('Error fetching RSS feed:', error);
            return [];
        }
    }

    parseRss(xml)
    {
        debugger;
        const filteredXml = xml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        const parser = new DOMParser();
        console.log("XML received:", filteredXml); // Log xml content for debugging
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
            const title = this.getElementText(item, this.urls[i].title);
            const description = this.getElementText(item, this.urls[i].description);
            const link = this.getElementText(item, this.urls[i].link);
            const author = this.getElementText(item, this.urls[i].author);
            const pubDate = this.getElementText(item, this.urls[i].pubDate);
            const enclosure = this.getEnclosureUrl(item);

            articles.push(
            {
                title,
                description,
                link,
                author,
                pubDate,
                enclosure 
            });
        }

        return articles;
    }

    getElementText(parent, tagName)
    {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent.trim() : '';
    }

    getEnclosureUrl(item)
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
}
