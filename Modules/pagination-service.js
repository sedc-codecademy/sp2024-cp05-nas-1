export class PaginationService
{
    constructor(newsService)
    {
        this.newsService = newsService;
        this.paginationContainer = document.getElementById('paginationContainer');
        this.currentPage = 1;
        this.itemsPerPage = 5;
    }

    renderPagination()
    {
        const totalPages = Math.ceil(this.newsService.newsArray.length / this.itemsPerPage);
        const currentPage = this.currentPage;
        const pageRange = 3;
        let paginationHTML = `<nav aria-label="Page navigation example"><ul class="pagination justify-content-center">`;
    
        // Previous Button
        paginationHTML += `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage - 1}" tabindex="-1">Previous</a>
            </li>`;
    
        // First Page
        if (currentPage > pageRange + 1)
        {
            paginationHTML += `
                <li class="page-item">
                    <a class="page-link" href="#" data-page="1">1</a>
                </li>
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">...</a>
                </li>`;
        }
    
        // Middle Pages
        const startPage = Math.max(1, currentPage - pageRange);
        const endPage = Math.min(totalPages, currentPage + pageRange);
    
        for (let i = startPage; i <= endPage; i++)
        {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>`;
        }
    
        // Last Page
        if (currentPage < totalPages - pageRange)
        {
            paginationHTML += `
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">...</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
                </li>`;
        }
    
        // Next Button
        paginationHTML += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
            </li>
        </ul></nav>`;
    
        this.paginationContainer.innerHTML = paginationHTML;
        this.addPaginationEventListeners();
    }

    addPaginationEventListeners()
    {
        this.paginationContainer.querySelectorAll('.page-link').forEach(button =>
        {
            button.addEventListener('click', (event) =>
            {
                event.preventDefault();
                const page = parseInt(event.target.getAttribute('data-page'));
                if (page > 0 && page <= Math.ceil(this.newsService.newsArray.length / this.itemsPerPage)) {
                    this.currentPage = page;
                    this.newsService.renderPage(page);
                }
            });
        });
    }
}
