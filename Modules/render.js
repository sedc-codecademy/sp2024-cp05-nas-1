export class Render
{
    static main(news, element)
    {
      //console.log(dayjs());
      element.innerHTML = '';
      news.forEach((newsItem) =>
      {
        // console.log(newsItem);
        // console.log(newsItem.urlToImage);
        // console.log(newsItem.title);
        // console.log(newsItem.description.substring(0, 100));
        // console.log(newsItem.publishDate);
        // console.log(newsItem.id);
        // console.log(newsItem.url);
        //console.log(`${new Date(newsItem.publishDate.format('YYYY-MM-DD HH:mm:ss'))}`);
        element.innerHTML += `
          <div class="row justify-content-center mb-4">
            <div class="col-auto">
              <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">

                  <div class="col-md-4">
                    <img src="${newsItem.urlToImage}" class="img-fluid rounded-start" alt="${newsItem.title}">
                  </div>

                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${newsItem.title}</h5>
                      <p class="card-text">${newsItem.description.substring(0, 100)}...</p>
                      <p class="card-text"><small class="text-body-secondary">Published: ${dayjs(newsItem.pubDate).format('ddd, D MMM, YYYY HH:mm')}</small></p>
                      <a href="" class="btn btn-primary" onclick="viewFullStory(${newsItem.id})">Read more</a>
                      <a href="${newsItem.url}" class="btn btn-primary" onclick="viewFullStory(${newsItem.id})">View source</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        });

        //NOT WORKING... I think it should be outside of main()...
        document.querySelectorAll('.view-full-story').forEach(button =>
        {
          button.addEventListener('click', function()
          {
            const id = parseInt(this.getAttribute('data-id'));
            newsService.viewFullStory(id);
          });
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