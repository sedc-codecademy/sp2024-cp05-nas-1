export class RenderFullStory
{
    static fullStory(news, element)
    {
        element.innerHTML = '';
        element.innerHTML += `
        <div class="card mb-3">
            <img src="${news.urlToImage}" class="card-img-top" alt="${news.title}"/>
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.description}</p>
                <p class="card-text">${news.author}</p>
                <p class="card-text">
                    <small class="text-muted">${dayjs(news.pubDate).format('ddd, D MMM, YYYY HH:mm')}</small>
                </p>
            </div>
        </div>`;
    };
}