export class News
{
    constructor(
    {
        id,
        title,
        url,
        description,
        //fullStory,
        publishDate,
        author,
        urlToImage
    })
    {
        this.id = id,
        this.title = title,
        this.url = url,
        this.description = description,
        //this.fullStory = fullStory,
        this.publishDate = publishDate,
        this.author = author,        
        this.urlToImage = urlToImage
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