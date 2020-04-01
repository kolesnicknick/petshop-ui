import ShowcaseModel from "./ShowcaseModel.js";
import ShowcaseView from "./ShowcaseView.js";
import PetController from "../pet-item/PetController.js";
import CartController from "../cart/CartController.js";
import DetailsController from "../pet-details/DetailsController.js";
import FiltrationController from "../filtration/FiltrationController.js";
import PaginatorController from "../paginator/PaginatorController.js";

import Publisher from '../../helper/Publisher.js'

const publisher = new Publisher();

export default class ShowcaseController {
    constructor() {
        this.model = new ShowcaseModel();
        this.view = new ShowcaseView();
        this.cart = new CartController();
        this.filtration = new FiltrationController();
        this.paginator = null;

        publisher.subscribe("add-pet-to-cart", this._rerenderHeader.bind(this));
        publisher.subscribe("remove-pet-from-cart", this._rerenderHeader.bind(this));
        publisher.subscribe("clear-cart", this._rerenderHeader.bind(this));
        publisher.subscribe("show-detail", this._showDetails.bind(this));
        publisher.subscribe("filter", this._filter.bind(this));
        publisher.subscribe("change-page", this._paginate.bind(this));
    }

    async render() {
        const model = this.model;

        const response = await model.fetchPets();
        model.pets = response.data;
        model.currentPage = response.info.page;
        model.totalPageCount = response.info.totalPages;
        this.paginator = new PaginatorController(response.info);

        this.view.render();
        this.paginator.render();
        this.cart.render();
        this.filtration.render();

        model.pets.forEach(pet => this._renderPetComponent(pet));
    }

    _filter({ breed, name, species, sorting }) {
        const model = this.model;

        model.breed = breed;
        model.name = name;
        model.species = species;
        model.sorting = sorting;
        model.currentPage = 1;

        _rerenderShowcase();
    }

    _paginate(newPage) {
        this.model.currentPage = newPage;
        
        _rerenderShowcase();
    }

    refresh() {
        this.view.refresh();
    }

    _rerenderHeader() {
        this.view.rerenderCart(this.cart.getCartItemsCount());
    }

    async _rerenderShowcase() {
        const model = this.model;
        const params = {
            page: model.currentPage,
            limit: model.itemsPerPage,
            breed: model.breed,
            name: model.name,
            species: model.species,
            sorting: model.sorting
        };

        const response = await model.fetchPets(params);

        model.pets = response.data;
        model.currentPage = response.info.page;
        model.totalPageCount = response.info.totalPages;

        this.refresh();
        model.pets.forEach(pet => this._renderPetComponent(pet));
    }

    _renderPetComponent(pet) {
        const itemsInCart = this.cart.getCartItems(),
            petComponent = new PetController(pet, itemsInCart.includes(pet));

        petComponent.render();
    }

    _showDetails(petData) {
        const modalDetails = new DetailsController(petData);
        modalDetails.render();
    }
};
