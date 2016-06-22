import AmpCollection from './AmpCollection.js';

class PaginatedCollection extends AmpCollection {
    constructor(data, size) {
        super(data);

        size = size || false;
        this.pages = {};

        if(size) {
            this.paginate(size);
        }
    }

    paginate(size) {
        let sets = [];

        let chunks = this.data.length / size;

        for(let i = 0, c = 0; i < chunks; i++, c += size) {
            sets[i] = this.data.slice(c, c + size);
        }

        this.pages = {
            current: 1,
            next: 2,
            previous: 1,
            last: sets.length,
            chunks: size
        };

        this._processed = sets;

        return this;
    }

    page(page) {
        page = page || 1;

        let pageReference = page-1;
        let nextPage = page+1;
        let previousPage = page-1;

        if(pageReference > this.pages.last) {
            nextPage = this.pages.last;
        }

        if(pageReference < 0) {
            previousPage = 0;
        }

        this.pages.current = page;
        this.pages.next = nextPage;
        this.pages.previous = previousPage;

        this._processed = this._data[page-1];

        return this;
    }
}

export default PaginatedCollection;
