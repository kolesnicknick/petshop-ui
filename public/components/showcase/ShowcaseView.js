import Publisher from "../../helper/Publisher.js";

const publisher = new Publisher();

export default class ShowcaseView {
    render() {
        const container = document.querySelector("#root"),
            template = `<header class="showcase-header"> 
                            <div class="logo-wrapper">
                                <img class="store-logo" src="https://cdn4.iconfinder.com/data/icons/pet-shop-14/500/pet_10-512.png" alt="store logo" />
                                <div class="shop-name">Animal planet</div>
                            </div>
                            <div class="user-block">
                                ${this._renderUserBlock()}
                                <div class="cart-toggler">
                                    <div class="cart-items-count">0</div>   
                                </div> 
                            </div>
                        </header>
                        <section class="pethop-settings"></section>
                        <main>
                            <div class="content-wrapper">
                                <section class="products">
                                    <p class="products-title">Our pets</p>
                                    <div class="pagination-wrapper">
                                </section>
                                <section class="cart-overlay">
                                </section>
                            </div>
                        </main>`;

        container.innerHTML = template;
        this._initHandlers();
    };

    _initHandlers() {
        const cart = document.querySelector(".cart-toggler");
        cart.addEventListener("click", () => publisher.notify("toggle-cart"))
    }

    rerenderCart(count) {
        const cart = document.querySelector(".cart-items-count");
        cart.innerText = count;
    }

    refresh() {
        const showcase = document.querySelector(".petshop-showcase");
        showcase.innerHTML = "";
    }

    _renderUserBlock() {
        const token = localStorage.getItem("token");
        return !token ? 
                        `<div class="auth-buttons">
                            <a href="#auth" class="sign-in-wrapper">Sign in</a>
                        </div>` :
                        `<div class="auth-buttons">
                            <a href="#create_order" class="link">Create order</a>
                            <a href="#orders" class="link">Orders</a>
                            <a href="#profile" class="link">My profile</a>
                         </div>`;
    }
}