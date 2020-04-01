import CartView from "./CartView.js";
import CartModel from "./CartModel.js";
import Publisher from "../../helper/Publisher.js";
import {api} from "../../api/ApiClient.js";

const publisher = new Publisher();

export default class CartController {
    constructor() {
        this.model = new CartModel();
        this.view = new CartView();

        publisher.subscribe("add-pet-to-cart", this.addItemToCart.bind(this));
        publisher.subscribe("remove-pet-from-cart", this.removeItem.bind(this));
        publisher.subscribe("clear-cart", this.clearCart.bind(this));
        publisher.subscribe("toggle-cart", this.toggleCart.bind(this));
        publisher.subscribe("checkout", this.checkout.bind(this));
    }

    getCartItems() {
        return this.model.cartItems;
    }

    getCartItemsCount() {
        return this.model.getCartItemsCount();
    }

    addItemToCart(pet) {
        this.model.addToCart(pet);
        this.render()
    }

    removeItem(id) {
        this.model.removeItem(id);
        this.render()
    }

    toggleCart() {
        this.view.toggleCart();
        this.render();
    }

    clearCart() {
        this.model.clearCart();
        this.render()
    }

    checkout() {
        const itemsInCart = this.model.cartItems,
            itemsToBuy = [];

        for (let item in itemsInCart) {
            itemsToBuy.push({"id": itemsInCart[item].id});
        }

        api.createOrder({"products": itemsToBuy})
            .then(x => {
                alert('Оплата прошла успешно');
                this.clearCart();
            })
            .catch(e => alert("Error: ", e));
    }

    render() {
        this.view.render(this.model.cartItems, this.model.totalSum);
    }
}
