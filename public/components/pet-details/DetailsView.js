import Publisher from "../../helper/Publisher.js";

const publisher = new Publisher();

export default class DetailsView {
    constructor(petData) {
        this.petData = petData;
        this._element = null;
    }

    render() {
        const root = document.getElementById("root"),
            element = document.createElement('div'),
            petData = this.petData,
            template = `<div class="modal-wrapper">
                        <div class="modal-block">
                            <div class="details-image">
                                <img src=${petData.image} alt="pet-image">
                            </div>
                            <div class="details-description">
                            ${petData.name ? `<div class="detail-name">${petData.name}</div>` : ''}
                                <div class="details-info">                              
                                    <div class="details-info-main">      
                                        <div class="detail-species">${petData.species}</div>
                                        <div class="detail-breed">${petData.breed}</div>
                                    </div>
                                    <div class="details-info-secondary">
                                        <div class="detail-gender">Gender: ${petData.gender}</div>
                                        <div class="detail-age">${petData.age}</div>
                                        <div class="detail-color">Color: ${petData.color}</div>
                                        <div class="detail-weight">Weight: ${petData.weight} kg</div>
                                        ${petData.water_type ? `<div class="detail-ytpe">Type: ${petData.water_type}</div>` : ''}
                                        ${typeof petData.is_sterile === "boolean" ?
                                           `<div class="detail-sterile"> 
                                                ${petData.is_sterile ? "Sterile" : "Not sterile"}
                                            </div>`
                                            : ''}
                                        ${petData.hair ? `<div class="detail-hair">Hair: ${petData.hair}</div>` : ''}
                                        ${petData.temper ? `<div class="detail-temper">Temper: ${petData.temper}</div>` : ''}
                                    </div> 

                                </div>
                                <div class="details-price">
                                    $ ${petData.price} 
                                </div>
                            </div>
                        </div>
                    </div>`;

        element.innerHTML = template;
        this._element = element;
        root.appendChild(element);

        this._initHandlers();
    }

    _initHandlers() {
        this._element.onclick = event => {
            const target = event.target;
            if (target.classList.contains("modal-wrapper")) {
                this._closeModal()
            }
        };

        document.onkeydown = e => e.keyCode === 27 && this._element ? this._closeModal() : null;
    }


    _closeModal() {
        const root = document.getElementById("root");
        root.removeChild(this._element);
        this._element = null;
    }
}
