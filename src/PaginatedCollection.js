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

        let chunks = this._data.length / size;

        for(let i = 0, c = 0; i < chunks; i++, c += size) {
            sets[i] = this._data.slice(c, c + size);
        }

        this._processed = sets;

        return this;
    }

    page(page) {
        page = page || 1;

        this._processed = this._data[0][page-1];

        return this;
    }
}

export default PaginatedCollection;
