import FiltrationView from "./FiltrationView.js";
import Publisher from "../../helper/Publisher.js";

const publisher = new Publisher();

export default class FiltrationController {
    constructor() {
        this.view = new FiltrationView(this.searchItems.bind(this));
    }

    render() {
        this.view.render();
    }

    searchItems(options) {
        publisher.notify('filter', options)
    }
}