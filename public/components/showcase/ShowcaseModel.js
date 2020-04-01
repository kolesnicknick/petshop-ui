import { api } from "../../api/ApiClient.js";

export default class ShowcaseModel {
    constructor() {
        this.petsData = [];
        this.selectedBreed = "";
        this.selectedName = "";
        this.selectedSpecies = "";
        this.selectedSorting = "";
        this.page = "";
        this.itemsPerPage = 10;
        this.totalPages = "";
    }

    get pets() {
        return this.petsData;
    }

    set pets(data) {
        this.petsData = data;
    }

    get breed() {
        return this.selectedBreed
    }

    set breed(breed) {
        this.selectedBreed = breed;
    }

    get name() {
        return this.selectedName
    }

    set name(name) {
        this.selectedName = name;
    }

    get species() {
        return this.selectedSpecies;
    }

    set species(species) {
        this.selectedSpecies = species;
    }

    get sotring() {
        return this.selectedSorting
    }

    set sotring(sotring) {
        this.selectedSorting = sotring;
    }

    get pageItemsLimit() {
        return this.itemsPerPage;
    }

    set pageItemsLimit(limit) {
        this.itemsPerPage = limit;
    }

    get currentPage() {
        return this.page;
    }

    set currentPage(page) {
        this.page = page;
    }

    get totalPageCount() {
        return this.totalPages
    }

    set totalPageCount(count) {
        this.totalPages = count;
    }


    fetchPets() {
        return api.getProducts({"page":1})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return this.petsData = data.data.map(pet => {
                    pet.age = ShowcaseModel.defineAge(pet["birth_date"]);
                    pet.image = api.baseUrl + "/" + pet.imageSrc;
                    console.log(pet);
                    return pet;
                });
            });
    }

    static defineAge(birthDate) {
        const diff = Date.now() - birthDate,
            diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

        const yearsAge = Math.floor(diffInDays / 365);
        const yearsToDisplay = yearsAge > 0 ?
            yearsAge === 1 ? `${yearsAge} year` : `${yearsAge} years` :
            "";

        const monthsAge = Math.floor((diffInDays % 365) / 30);
        const monthToDisplay = monthsAge > 0 ?
            monthsAge === 1 ? `${monthsAge} month` : `${monthsAge} months` :
            "";

        const daysAge = Math.floor((diffInDays % 365) - monthsAge * 30);
        const daysToDisplay = daysAge > 0 ?
            daysAge === 1 ? `${daysAge} day` : `${daysAge} days` :
            "";

        return `Age: ${yearsToDisplay} ${monthToDisplay} ${daysToDisplay}`;
    }

}
