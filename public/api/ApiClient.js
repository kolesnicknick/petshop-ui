import { paramBuilder } from './ParamBuilder.js'

class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getProducts(params) {
        const search = paramBuilder.withPage(params.page || 1).withLimit(10).build();
        console.log(search);
        return await fetch(`${this.baseUrl}/products${search}`)
    }

    async login({email, password}) {
        return await fetch(`${this.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password}
            )
        });
    }

    async register({firstName, email, password}) {
        return await fetch(`${this.baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({firstName, email, password})
        });
    }

    async createProduct({name, species, price, gender, weight, birth_date, color, breed, temper, image}) {
        return await fetch(`${this.baseUrl}/products/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({name, species, price, gender, weight, birth_date, color, breed, temper})
        });
    }

    async createOrder(products) {
        return await fetch(`${this.baseUrl}/orders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(products)
        });
    }

    async selfInfo(){
        return await fetch(`${this.baseUrl}/products${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
    }

    async getCategories(){
        return await fetch(`${this.baseUrl}/products/categories`);
    }

    async orderHistory(){
        return await fetch(`${this.baseUrl}/orders/history`);
    }
}

export let api = new ApiClient('http://127.0.0.1:54322');

