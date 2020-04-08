import Publisher from "./Publisher.js";
import AuthController from "../components/authorization/AuthController.js";
import ShowcaseController from "../components/showcase/ShowcaseController.js";
import OrderController from "../components/common/OrderController.js";

const publisher = new Publisher(),
    routes = [
        'auth',
        'showcase',
        'orders'
    ];

export default class Router {
    init() {
        addEventListener("hashchange", this.handlehash.bind(this));
        this.handlehash()
    }

    _getRoute() {
        const hash = location.hash ? location.hash.slice(1) : "showcase",
            [name, id] = hash.split('/');

        return { name, params: id };
    }

    handlehash() {
        let { name, params } = this._getRoute();

        if (name && routes.includes(name)) {
            name = name.toUpperCase().slice(0, 1) + name.slice(1);

            const method = `_display${name}`;
            this[method](params);
        }
    }

    _displayAuth() {
        const authPage = new AuthController();
        authPage.render();
    }

    _displayShowcase() {
        const showcasePage = new ShowcaseController();
        showcasePage.render();
    }

    _displayOrders() {
        const ordersPage = new OrderController();
        ordersPage.render();
    }
}
