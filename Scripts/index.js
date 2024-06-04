document.addEventListener('DOMContentLoaded', function() {
    const latestNewsBtn = document.getElementById('latest-news-btn');
    const oldestNewsBtn = document.getElementById('oldest-news-btn');
    const newsContainer = document.getElementById('news-cards');

    latestNewsBtn.addEventListener('click', function() {
        fetchNews('/api/news');
    });

    oldestNewsBtn.addEventListener('click', function() {
        fetchNews('/api/news/archive');
    });

    function fetchNews(apiEndpoint) {
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                newsContainer.innerHTML = '';
                data.forEach(article => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <a href="${article.link}" target="_blank">Read more</a>
                    `;
                    newsContainer.appendChild(card);
                });
            });
    }

    fetchNews('/api/news');
    
});