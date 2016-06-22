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
        size = size || 5;
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

    _getPage(page) {
        let pageReference = page-1;
        let nextPage = page+1;
        let previousPage = page-1;

        if(page >= this.pages.last) {
            nextPage = this.pages.last;
        }

        if(page <= 1) {
            previousPage = 1;
        }

        this.pages.current = page;
        this.pages.next = nextPage;
        this.pages.previous = previousPage;

        this._processed = this._data[page-1];
    }

    page(page) {
        page = page || 1;
        this._getPage(page);
        return this;
    }

    next() {
        this._getPage(this.pages.next);
        return this;
    }

    previous() {
        this._getPage(this.pages.previous);
        return this;
    }
}

export default PaginatedCollection;
