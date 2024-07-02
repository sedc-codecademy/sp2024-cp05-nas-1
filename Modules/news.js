export class News
{
    constructor({
        id,
        title,
        link,
        description,
        pubDate,
        author,
        urlToImage
    })
    {
        this.id = id;
        this.title = title;
        this.link = link;
        this.description = description;
        this.pubDate = pubDate;
        this.author = author;
        this.urlToImage = urlToImage;
    }
}