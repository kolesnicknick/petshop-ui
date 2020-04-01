import PetView from "./PetView.js";

export default class PetController {
    constructor(pet, inCart) {
        this.view = new PetView(pet, inCart);
    }

    render() {
        this.view.render();
    }
}