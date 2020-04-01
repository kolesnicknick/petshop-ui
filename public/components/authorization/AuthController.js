import AuthModel from "./AuthModel.js";
import AuthView from "./AuthView.js";


export default class AuthController {
    constructor() {
        this.model = new AuthModel();
        this.view = new AuthView();
    }

    render() {
        this.view.render(); 
    }
}