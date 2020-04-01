class UrlParams {
    static get Builder() {
        class Builder {
            constructor() {
                this.query = '';
            }

            asParam(param) {
                return '&' + param;
            }

            withSort(sortParams) {
                this.query += (this.asParam(`sort=${sort}`));
                return this;
            }

            withPage(page) {
                this.query += (this.asParam(`page=${page}`));
                return this;
            }

            withLimit(limitOnPage) {
                this.query += (this.asParam(`limit=${limitOnPage}`));
                return this;
            }

            withBreed(breed) {
                this.query += (this.asParam(`breed=${breed}`));
                return this;
            }

            withCategories(categories) {
                this.query += (this.asParam(`categories=${categories}`));
                return this;
            }

            build() {
                this.query = this.query.replace('&', '?');
                let tempQuery = this.query;
                this.query = "";
                return tempQuery;
            }
        }

        return Builder;
    }
}

export let paramBuilder = new UrlParams.Builder();

