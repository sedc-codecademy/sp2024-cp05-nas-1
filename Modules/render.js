export class Render
{
    static main(news, element)
    {
        news.forEach((newsItem) =>
        {
            element.innerHTML += 
            `<div class="row justify-content-center mb-4">
                <div class="col-auto">
                  <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${newsItem.urlToImage}" class="img-fluid rounded-start" alt="${newsItem.author}">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${newsItem.title}</h5>
                          <p class="card-text">${newsItem.description}</p>
                          <p class="card-text"><small class="text-body-secondary">Last updated: ${new Date(newsItem.publishedAt).toLocaleString()}</small></p>
                          <a href="${newsItem.url}" class="btn btn-primary" target="_blank">More details</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
        });
    }    
}
//let test2 =
//`<div class="card mb-3" style="max-width: 540px;">
//         <div class="row g-0">
//             <div class="col-md-4">
//                 <img src="${newsItem.urlToImage}" class="img-fluid rounded-start" alt="${newsItem.author}">
//             </div>
//             <div class="col-md-8">
//                 <div class="card-body">
//                     <h5 class="card-title">${newsItem.title}</h5>
//                     <p class="card-text">${newsItem.title}</p>
//                     <p class="card-text"><small class="text-body-secondary"><a href="${newsItem.url}">More info on ${newsItem.author}</a></small></p>
//                 </div>
//             </div>
//         </div>
//   </div>`;

//let test = 
//`<div class="cardContainer col">
//<div class=""col-md-4"">
//  <img src="${newsItem.urlToImage}" class="card-img-top" alt="${newsItem.author}">
//    <div class="card-body">
//      <h5 class="card-title">${newsItem.title}</h5>
//      <p class="card-text">${newsItem.title}</p>
//      <a href="#" class="btn btn-primary" id="${newsItem.url}">More details</a>
//    </div>
//</div>
//</div>`;