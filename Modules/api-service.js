export class ApiService
{
    constructor()
    {
        this.baseUrl = 'https://newsapi.org/v2/top-headlines?' +
        'country=gb&' +
        'apiKey=5203562ce3764475b52d0ab9b11960ec';
    }


    async fetchNews()
    {
        const response = await fetch(this.baseUrl);
        if(!response.ok)
        {
            throw new Error(`HTTP ERROR. Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        return data.articles;
    }
// let req = new Request(url);

// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     });
}

//export { ApiService };