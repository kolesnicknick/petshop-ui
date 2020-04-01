import Publisher from '../../helper/Publisher.js'

const publisher = new Publisher();

export default class CartView {
    constructor() {
        this._element = null;
        this._cartIsShown = false;
    }

    toggleCart() {
        this._cartIsShown = !this._cartIsShown;
    }

    render(data, total) {
        const container = document.querySelector(".cart-overlay"),
            cartTemplate = `<div class="cart-block">
                                <header class="cart-header">
                                    <button class="btn cart-clear-btn">Clear cart</button>
                                    <div class="cart-total">
                                        Total: $ ${total}
                                    </div>
                                </header>
                                <section class="cart-item-list">
                                    ${data.map(item => this._renderItem(item)).join("")}
                                </section>
                                <footer class="cart-footer">
                                    <button class="btn cart-purchase-btn">Checkout</button>
                                </footer>
                            </div>`;

        container.innerHTML = cartTemplate;
        this._cartIsShown ? container.classList.add('active') : container.classList.remove('active');

        this._element = container;
        this._initHandlers(total);
    }

    _renderItem(item) {
        return `<div class="cart-item-wrapper">
                    <div class="cart-item-img">
                        <img src=${item.image}>
                    </div>
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.species}</h4>
                        <h5 class="cart-item-breed">${item.breed}</h5>
                        <p class="cart-item-price">$${item.price}</p>
                        <span data-id=${item.id} class="remove-from-cart">✕</span>
                    </div>
                </div>`
    }

    _initHandlers(total) {
        const removeFromCartButtons = this._element.querySelectorAll(".remove-from-cart"),
            clearButton = this._element.querySelector(".cart-clear-btn"),
            checkoutButton = this._element.querySelector(".cart-purchase-btn");

        this._element.onclick = event => {
            const target = event.target;
            if (target.classList.contains("cart-overlay")) {
                publisher.notify('toggle-cart');
            }
        };

        document.onkeydown = e => (e.keyCode === 27 && this._cartIsShown) ? publisher.notify('toggle-cart') : null;

        !total ? clearButton.setAttribute("disabled", true) : null;
        !total ? checkoutButton.setAttribute("disabled", true) : null;

        removeFromCartButtons.forEach(button => button.addEventListener("click", this._removeItem.bind(this, button.dataset.id)));
        clearButton.addEventListener('click', this._clearCart);
        checkoutButton.addEventListener('click', this._checkout);
    }

    _clearCart() {
        publisher.notify("clear-cart");
    }

    _removeItem(id) {
        publisher.notify("remove-pet-from-cart", id);
    }

    _checkout() {
        publisher.notify("checkout");
    }
}