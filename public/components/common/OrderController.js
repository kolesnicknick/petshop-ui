import {api} from "../../api/ApiClient.js";

export default class OrderController {
    constructor() {
    }

    async render() {
        let orders = await api.orderHistory();
        let x = document.createElement("TABLE");
        x.setAttribute("id", "myTable");
        document.querySelector('.products').innerHTML = x;

        for (let i = 0; i < orders.data.length; i++) {

            let y = document.createElement("TR");
            y.setAttribute("id", "myTr" + i);
            document.getElementById("myTable").appendChild(y);

            let z = document.createElement("TD");
            let t = document.createTextNode(orders.data[i].buyer.firstName);
            z.appendChild(t);
            y.appendChild(z);

            let s = document.createElement("TD");
            let w = document.createTextNode('for ' + orders.data[i].product.price);
            s.appendChild(w);
            y.appendChild(s);

            let a = document.createElement("TD");
            let b = document.createTextNode(orders.data[i].seller.firstName);
            a.appendChild(b);
            y.appendChild(a);

            let c = document.createElement("TD");
            let d = document.createTextNode(orders.data[i].createdAt);
            c.appendChild(d);
            y.appendChild(c);
        }
    };
}
