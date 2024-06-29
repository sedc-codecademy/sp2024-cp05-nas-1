export class News
{
    constructor({
        id,
        title,
        link,
        description,
        publishDate,
        author,
        urlToImage
    })
    {
        this.id = id;
        this.title = title;
        this.link = link;
        this.description = description;
        this.publishDate = publishDate;
        this.author = author;
        this.urlToImage = urlToImage;
    }
}