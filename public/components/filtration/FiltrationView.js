import Publisher from "../../helper/Publisher.js";

const publisher = new Publisher();

export default class FiltrationView {
    constructor(searchItemsCb) {
        this.element = null;
        this.searchItemsCb = searchItemsCb;
    }

    render() {
        const container = document.querySelector(".pethop-settings"),
            template = `<input type="text" class="breed-input" placeholder="Type in pet's breed">
                        <input type="text" class="name-input" placeholder="Type in pet's name">
                        <select class="selector">
                            <option value="null">All</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="raccoon">Raccoon</option>
                            <option value="fish">Fish</option>
                            <option value="elephant">Elephant</option>
                            <option value="mouse">Mouse</option>
                        </select>
                        <div class="sort">Price<div class="sort-icon"></div></div>
                        <button class="btn search-btn">Search</button>`;

        container.innerHTML = template;
        this.element = container;

        this._initHandlers();
    }

    _initHandlers() {
        const searchButton = document.querySelector(".search-btn"),
            breedField = document.querySelector(".breed-input"),
            nameField = document.querySelector(".name-input"),
            speciesSelector = document.querySelector(".selector"),
            priceSortet = document.querySelector(".sort");

        let breed = null, name = null, species = null, sorting = "price:ASC";

        breedField.oninput = event => breed = event.target.value.trim().toLowerCase();
        nameField.oninput = event => name = event.target.value.trim().toLowerCase();
        speciesSelector.onchange = event => species = event.target.value;
        priceSortet.onclick = () => {
            priceSortet.classList.toggle('dsc');
            sorting = this._togglePriceSorting(sorting);
        }

        searchButton.onclick = () => this.searchItemsCb({ breed, name, species, sorting });
    }

    _togglePriceSorting(value) {
        return value === "price:ASC" ? "price:DESC" : "price:ASC";
    }
}