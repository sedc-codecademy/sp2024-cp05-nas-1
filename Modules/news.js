export class News
{
    constructor({
        id,
        source,
        title,
        link,
        description,
        pubDate,
        author,
        urlToImage,
        trustScore
    })
    {
        this.id = id;
        this.source = source;
        this.title = title;
        this.link = link;
        this.description = description;
        this.pubDate = pubDate;
        this.author = author;
        this.urlToImage = urlToImage;
        this.trustScore = trustScore;
    }
}