import Publisher from "../../helper/Publisher.js";

const publisher = new Publisher();

export default class PetView {
    constructor(pet, inCart) {
        this.pet = pet;
        this.inCart = inCart;
        this.element = null;
        this.button = null;
        publisher.subscribe("remove-pet-from-cart", this._resetAddButton.bind(this));
        publisher.subscribe("clear-cart", this._resetAllAddButtons.bind(this));
    }

    render() {
        const container = document.querySelector(".petshop-showcase"),
            element = document.createElement("div"),
            template = `<div class="product-img">
                            <img src=${this.pet.image} alt="pet-image">
                        </div>
                        <div class="btn-wrapper"></div>
                        <div class="product-info">
                            <div class="product-name">${this.pet.species}</div>
                            <div class="product-kind">${this.pet.breed}</div> 
                            <div class="product-age">${this.pet.age}</div>
                            <div class="product-price">$ ${this.pet.price}</div>
                        </div>`;


        element.classList.add("product-card");
        element.innerHTML = template;
        this.element = element;
        this._renderButton();

        container.appendChild(this.element);
    }

    _renderButton() {
        const container = this.element.querySelector(".btn-wrapper"),
            button = document.createElement("button");

        button.classList.add("btn");
        button.setAttribute("data-id", this.pet.id);

        if (this.inCart) {
            button.innerText = "In cart";
            button.setAttribute("disabled", true);
        } else {
            button.classList.add("add-to-cart");
            button.innerText = "Add to cart";
        }

        container.innerHTML = "";
        container.appendChild(button);
        this.button = button;
        this._initHandlers();
    }

    _initHandlers() {
        this.element.onclick = this._showDetails.bind(this);

        if (this.inCart) return;

        this.button.onclick = this._addToCart.bind(this);
    }

    _togglePetInCart() {
        this.inCart = !this.inCart;
    }

    _addToCart() {
        this._togglePetInCart();
        publisher.notify("add-pet-to-cart", this.pet);
        this._renderButton();
    }

    _showDetails(event) {
        if (!event.target.classList.contains("btn")) {
            publisher.notify("show-detail", this.pet);
        }
    }

    _resetAddButton(id) {
        if (id && id === this.button.dataset.id) {
            this._togglePetInCart();
            this.button.removeAttribute("disabled");
            setTimeout(() => this._renderButton(), 500);
        }
    }

    _resetAllAddButtons() {
        this.inCart = false;
        this.button.removeAttribute("disabled");
        setTimeout(() => this._renderButton(), 500);
    }
};
