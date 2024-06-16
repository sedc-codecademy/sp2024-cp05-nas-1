export class ApiService {
    constructor()
    {
        this.urls = [
        // {
        //     source: 'MIA',
        //     feedUrl: 'https://mia.mk/feed',
        //     title: 'title',
        //     description: 'description',
        //     link: 'link',
        //     author: 'author',
        //     pubDate: 'pubDate',
        //     urlToImage: { query: 'enclosure', attribute: 'url' }
        // },
        // {
        //     source: 'Telma',
        //     feedUrl: 'https://telma.com.mk/feed/',
        //     title: 'title',
        //     description: 'content:encoded',
        //     link: 'link',
        //     author: 'dc:creator',
        //     pubDate: 'pubDate',
        //     urlToImage: { query: 'content\\:encoded, encoded', regex: /<img[^>]*src="([^"]*)"/i }
        // },
        // {
        //     source: '24 Vesti',
        //     feedUrl: 'https://admin.24.mk/api/rss.xml',
        //     title: '',
        //     description: 'content',
        //     link: 'link',
        //     author: 'dc:creator',
        //     pubDate: 'pubDate',
        //     urlToImage:  { query: 'img', attribute: 'src' }
        // },
        // {
        //     source: 'Sitel',
        //     feedUrl: 'https://sitel.com.mk/rss.xml',
        //     title: 'title',
        //     description: 'description',
        //     link: 'link',
        //     author: 'dc:creator',
        //     pubDate: 'pubDate',
        //     urlToImage: { query: 'description', regex: /<img[^>]*src="([^"]*)"/i }
        // },
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
    }
    
    async fetchRssFeed()
    {
        try
        {
            debugger;
            const responses = await Promise.all(this.urls.map(urlConfig => fetch(urlConfig.feedUrl)));
            const xmlData = await Promise.all(responses.map(response => response.text()));

            const allArticles = [];
            debugger;
            for (let i = 0; i < xmlData.length; i++) {
                const parsedArticles = this.parseRss(xmlData[i], this.urls[i]);
                allArticles.push(...parsedArticles);
            }

            console.log(allArticles);
            return allArticles;
        }
        catch (error)
        {
            console.error('Error fetching RSS feed:', error);
            return [];
        }
    }

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
                //console.log(urlConfig.title);
                //const description = this.getElementText(item, urlConfig.description);
                let description = this.stripHtmlTags(this.getElementText(item, urlConfig.description));
                //console.log(urlConfig.description);
                const url = this.getElementText(item, urlConfig.link);
                //console.log(urlConfig.link);
                const author = this.getElementText(item, urlConfig.author);
                //console.log(urlConfig.author);
                const publishDate = this.getElementText(item, urlConfig.pubDate);
                //console.log(urlConfig.pubDate);
                const urlToImage = this.getEnclosureUrl(item, urlConfig.urlToImage);
                //const urlToImage = this.getEnclosureUrl(item);// || this.getElementText(item, urlConfig.enclosure);
                //console.log(this.getEnclosureUrl(item));

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

        return articles;
    }

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

    getElementText(parent, tagName)
    {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent.trim() : '';
    }

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

    getEnclosureUrl2(item)
    {
        // Debugging and logging
        debugger;
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
}
