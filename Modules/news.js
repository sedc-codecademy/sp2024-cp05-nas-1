export class News
{
    constructor({
        id,
        title,
        url,
        description,
        publishDate,
        author,
        urlToImage
    })
    {
        this.id = id;
        this.title = title;
        this.url = url;
        this.description = description;
        this.publishDate = publishDate;
        this.author = author;
        this.urlToImage = urlToImage;
    }
}