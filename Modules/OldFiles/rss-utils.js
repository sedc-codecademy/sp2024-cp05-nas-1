// Function to fetch XML data from RSS feed URL
export async function fetchRss(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return null;
    }
}

// Function to parse RSS XML
export function parseRss(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');
    const articles = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = getElementText(item, 'title');
        const description = getElementText(item, 'description') || getElementText(item, 'content:encoded');
        const link = getElementText(item, 'link');
        const author = getElementText(item, 'author') || getElementText(item, 'dc:creator');
        const pubDate = getElementText(item, 'pubDate');
        const enclosure = getEnclosureUrl(item);

        articles.push({
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

// Helper functions
function getElementText(parent, tagName) {
    const element = parent.getElementsByTagName(tagName)[0];
    return element ? element.textContent.trim() : '';
}

function getEnclosureUrl(item) {
    const contentEncoded = item.getElementsByTagName('content:encoded')[0];
    if (contentEncoded) {
        const enclosureMatch = contentEncoded.textContent.match(/<enclosure\s+url="([^"]+)"/);
        if (enclosureMatch) {
            return enclosureMatch[1];
        }
    }
    return '';
}
