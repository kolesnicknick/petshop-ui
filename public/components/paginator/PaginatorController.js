import PaginatorView from "./PaginatorView.js";

export default class PaginatorController {
    constructor(options) {
        this.view = new PaginatorView(options);
    }

    render() {
        this.view.render();
    }
}