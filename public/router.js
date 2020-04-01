import RouterController from "./helper/Router.js";

const routes = [
    'petshop',
    'auth'
];

function getTouterInfo() {
    const hash = location.hash ? location.hash.slice(1) : "petshop";
    const [name, id] = hash.split('/');

    return { name, params: id };
}

function handlehash() {
    const { name, params } = getTouterInfo();

    if (name && routes.includes(name)) {
        const routeName = name + 'Router';
        RouterController[routeName](params);
    }
}

export default {
    init() {
        addEventListener("hashchange", handlehash);
        handlehash()
    }
}
