import Publisher from '../../helper/Publisher.js'

const publisher = new Publisher();

export default class PaginatorView {
    constructor({ page, totalPages }) {
        this.page = page;
        this.totalPages = totalPages;
        this.element = null;
    }

    render() {
        const container = document.querySelector(".pagination-wrapper"),
            template = `<div class="petshop-showcase"></div>
                        <div class="pagination-controllers">
                            <button class="pagination-step previous-step" ${this.page === 1 ? "disabled" : ""}>&lt;</button>
                            <div class="pagination-current-page">${this.page}</div>
                            <button class="pagination-step following-step" ${this.page === this.totalPages ? "disabled" : ""}>&gt;</button>
                        </div>`

        container.innerHTML = template;
        this._initHandlers();
    }

    _initHandlers() {
        const previousController = document.querySelector(".previous-step"),
            followingController = document.querySelector(".following-step");

        previousController.onclick = () => publisher.notify("change-page", --this.page);
        followingController.onclick = () => publisher.notify("change-page", ++this.page);
    }
};