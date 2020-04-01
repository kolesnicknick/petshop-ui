export default class CartModel {
    constructor() {
        this._itemsInCart = [];
        this.total = 0;
    }

    get cartItems() {
        return this._itemsInCart;
    }

    set cartItems(items) {
        this._itemsInCart = items;
    }

    get totalSum() {
        return this.total;
    }

    set totalSum(sum) {
        this.total = sum;
    }

    addToCart(item) {
        this.cartItems.push(item);
        this.calculateTotal();
    }

    removeItem(id) {
        this.cartItems = this.cartItems.filter(item => item.id !== +id);
        this.calculateTotal();
    }

    clearCart() {
        this.cartItems = [];
        this.calculateTotal();
    }

    getCartItemsCount() {
        return this.cartItems.length;
    }

    calculateTotal() {
        const sum = this.cartItems.reduce((x, y) => {
            return x + +y.price
        }, 0);
        
        this.totalSum = (Math.round(sum * 100) / 100).toLocaleString();
    }
}