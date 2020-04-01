import DetailsView from "./DetailsView.js";

export default class DetailsController {
    constructor(petData) {
        this.view = new DetailsView(petData);
    }

    render() {
        this.view.render();
    }
}