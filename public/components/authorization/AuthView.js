import { api } from "../../api/ApiClient.js";
import Validator from "../../helper/Validator.js"

export default class AithView {
    constructor() {
        this.template = this._initTemplate();
        this.signInFields = {
            email: {
                value: '',
                hasError: false,
                error: '',
                validators: [Validator.verifyEmail]
            },
            password: {
                value: '',
                hasError: false,
                error: '',
                validators: [Validator.checkPassword]
            }
        };
        this.signUpFields = {
            name: {
                value: '',
                hasError: false,
                error: '',
                validators: [Validator.checkName]
            },
            email: {
                value: '',
                hasError: false,
                error: '',
                validators: [Validator.verifyEmail]

            },
            password: {
                value: '',
                hasError: false,
                error: '',
                validators: [Validator.checkPassword]
            }
        }
    };

    _initTemplate() {
        return `<div class="container" id="container">
                    <div class="form-container sign-up-container">
                        <form>
                            <h1>Create Account</h1>
                            <span>or use your email for registration</span>
                            <input name="name" class="auth-input sign-up-input" type="text" placeholder="Name" autocomplete="off" />
                            <input name="email" class="auth-input sign-up-input" type="email" placeholder="Email"  autocomplete="off" />
                            <input name="password" class="auth-input sign-up-input" type="password" placeholder="Password" autocomplete="off" />
                            <p class="sign-up-error error-field"></p>
                            <button id="sign-up-submit" class="auth-button">Sign Up</button>
                        </form>
                    </div>
                    <div class="form-container sign-in-container">
                        <form>
                            <h1>Sign in</h1>
                            <span>or use your account</span>
                            <input name="email" class="auth-input sign-in-input" type="email" placeholder="Email"  autocomplete="off" />
                            <input name="password" class="auth-input sign-in-input" type="password" placeholder="Password"  autocomplete="off" />
                            <a href="#">Forgot your password?</a>
                            <p class="sign-in-error error-field"></p>
                            <button id="sign-in-submit" class="auth-button">Sign In</button>
                        </form>
                    </div>
                    <div class="overlay-container">
                        <div class="overlay">
                            <div class="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button class="auth-button ghost" id="sign-in-switcher">Sign In</button>
                            </div>
                            <div class="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button class="auth-button ghost" id="sign-up-switcher">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>`
    }

    render() {
        const root = document.getElementById("root");
        root.innerHTML = this.template;
        this._initHandlers();
    }

    _initHandlers() {
        const signUpSwitcher = document.getElementById('sign-up-switcher'),
            signInSwitcher = document.getElementById('sign-in-switcher'),
            signInSubmitter = document.getElementById('sign-in-submit'),
            signUpSubmitter = document.getElementById('sign-up-submit'),
            container = document.getElementById('container'),
            signInFields = [...document.querySelectorAll(".sign-in-input")],
            signUpFields = [...document.querySelectorAll(".sign-up-input")];

        signUpSwitcher.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInSwitcher.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });

        signInFields.forEach(input => input.oninput = this._handleSignInInput.bind(this));
        signUpFields.forEach(input => input.oninput = this._handleSignUpInput.bind(this));

        signInSubmitter.addEventListener('click', this._signIn.bind(this));
        signUpSubmitter.addEventListener('click', this._signUp.bind(this));
    }

    _handleSignInInput(event) {
        const { name, value } = event.target;
        this.signInFields[name].value = value;
    }

    _handleSignUpInput() {
        const { name, value } = event.target;
        this.signUpFields[name].value = value;
    }

    _signIn(event) {
        event.preventDefault();

        for (let prop in this.signInFields) {
            this.signInFields[prop].validators
                .forEach(validator => validator(this.signInFields[prop]));

            if (this.signInFields[prop].hasError) {
                this._showSignInError(this.signInFields[prop].error);
                return;
            }

            this._clearError();
        }

        const email = this.signInFields.email.value,
            password = this.signInFields.password.value;

        this._clearFields();

        api.login({ email, password })
            .then(response => response.json())
            .then(data => localStorage.setItem("token", data.data.token))
            .then(() => location.hash = "#showcase")
            .catch(error => console.log("Error: ", error))
    }

    _signUp() {
        event.preventDefault();

        for (let prop in this.signUpFields) {
            this.signUpFields[prop].validators
                .forEach(validator => validator(this.signUpFields[prop]));

            if (this.signUpFields[prop].hasError) {
                this._showSignUpError(this.signUpFields[prop].error);
                return;
            }

            this._clearError();
        }

        const email = this.signUpFields.email.value,
            password = this.signUpFields.password.value,
            firstName = this.signUpFields.name.value;

        this._clearFields();

        api.register({ firstName, email, password })
            .then(() => location.reload())
            .catch(e => console.log("error:", e))
    }

    _showSignInError(message) {
        const error = document.querySelector(".sign-in-error");
        error.innerText = message;
    }

    _showSignUpError(message) {
        const error = document.querySelector(".sign-up-error");
        error.innerText = message;
    }

    _clearError() {
        const errors = [...document.querySelectorAll(".error-field")];
        errors.forEach(error => error.innerText = "");
    }

    _clearFields() {
        const fields = [...document.querySelectorAll(".auth-input")];
        fields.forEach(input => input.value = "");

        for (const field in this.signInFields) {
            this.signInFields[field].value = ""
        }

        for (const field in this.signUpFields) {
            this.signUpFields[field].value = ""
        }
    }
}
