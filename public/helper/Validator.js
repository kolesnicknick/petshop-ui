export default class Validator {
    static checkName (field) {
        if (!field.value.length) {
            field.hasError = true;
            field.error = "Name field is empty";
        } else {
            field.hasError = false;
            field.error = "";
        }
    }

    static checkPassword(field) {
        if (!field.value.length) {
            field.hasError = true;
            field.error = "Password field is empty";
        } else {
            field.hasError = false;
            field.error = "";
        }
    }

    static verifyEmail(field) {
        const regExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (!regExp.test(field.value)) {
            field.hasError = true;
            field.error = "Check your email";
        } else {
            field.hasError = false;
            field.error = "";
        }
    }
}