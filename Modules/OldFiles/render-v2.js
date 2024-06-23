//import dayjs from 'dayjs'; // Import dayjs for date formatting


export class Render {
    static main(news, element) {
        element.innerHTML = ''; // Clear existing content
        
        // Use Array.prototype.map to generate HTML for each news item
        const html = news.map(newsItem => `
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
                                    <p class="card-text"><small class="text-body-secondary">Published: ${dayjs(newsItem.publishDate).format('DD-MMM-YYYY')}</small></p>
                                    <a href="${newsItem.url}" class="btn btn-primary view-full-story" data-id="${newsItem.id}">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join(''); // Join array into a single string
        
        element.innerHTML = html; // Set innerHTML once with all generated HTML

        // Add event listeners for 'Read more' buttons using querySelectorAll
        document.querySelectorAll('.view-full-story').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const id = parseInt(this.getAttribute('data-id'));
                newsService.viewFullStory(id);
            });
        });
    }
}
// import format from 'date-fns/format';  // Import date-fns format function

// export class Render {
//     static main(news, element) {
//         element.innerHTML = ''; // Clear existing content
        
//         // Use Array.prototype.map to generate HTML for each news item
//         const html = news.map(newsItem => `
//             <div class="row justify-content-center mb-4">
//                 <div class="col-auto">
//                     <div class="card mb-3" style="max-width: 540px;">
//                         <div class="row g-0">
//                             <div class="col-md-4">
//                                 <img src="${newsItem.urlToImage}" class="img-fluid rounded-start" alt="${newsItem.title}">
//                             </div>
//                             <div class="col-md-8">
//                                 <div class="card-body">
//                                     <h5 class="card-title">${newsItem.title}</h5>
//                                     <p class="card-text">${newsItem.description.substring(0, 100)}...</p>
//                                     <p class="card-text"><small class="text-body-secondary">Published: ${format(new Date(newsItem.publishDate), 'dd-MMM-yyyy')}</small></p>
//                                     <a href="${newsItem.url}" class="btn btn-primary view-full-story" data-id="${newsItem.id}">Read more</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `).join(''); // Join array into a single string
        
//         element.innerHTML = html; // Set innerHTML once with all generated HTML

//         // Add event listeners for 'Read more' buttons using querySelectorAll
//         document.querySelectorAll('.view-full-story').forEach(button => {
//             button.addEventListener('click', function(event) {
//                 event.preventDefault(); // Prevent default link behavior if necessary
//                 const id = parseInt(this.getAttribute('data-id'));
//                 newsService.viewFullStory(id); // Assuming newsService is globally accessible
//             });
//         });
//     }
// }
