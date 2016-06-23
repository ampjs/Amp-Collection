import AmpCollection from './AmpCollection.js';
/**
 * Extends on AmpCollection and allows for pagination
 * of the data to be used.
 * @class
 * @classdesc Pagination class for AmpCollection
 */
class PaginatedCollection extends AmpCollection {
    /**
     * Construct the class
     * @param  {Array}      data        The given data to add to a collection.
     * @param  {Integer}    size=false  The amount of chunks to be used per-page.
     * @return {Object}                 Returns self
     */
    constructor(data, size) {
        super(data);

        size = size || false;
        /**
         * Holds information reguarding to
         * the position of the currently
         * viewed page.
         * @type {Object}
         */
        this.pages = {};

        if(size) {
            this.paginate(size);
        }
    }

    /**
     * Chunks the data based on the given size.
     * @param  {Integer} size=5 The amount of chunks to be used per-page.
     * @return {Object}         Returns self.
     */
    paginate(size) {
        size = size || 5;
        let sets = [];
        let chunks = this.data.length / size;

        for(let i = 0, c = 0; i < chunks; i++, c += size) {
            sets[i] = this.data.slice(c, c + size);
        }

        /**
         * Setup default page and positions.
         * @type {Object}
         */
        this.pages = {
            current: 1,
            next: 2,
            previous: 1,
            last: sets.length,
            chunks: size
        };

        /**
         * Sets the processed data to the
         * newly chunked array. _processed
         * is handled by AmpCollection.
         * @type {Array}
         */
        this._processed = sets;

        return this;
    }

    /**
     * Gets the given page from the data object
     * and replaces _processed data with the newly
     * required Array. Given pages are based on a
     * #1 starting indices rather than #0.
     * _getPage will also update the page position
     * object with the necassary information.
     * @param  {Integer|Number} page The required page.
     * @return {Object}              Returns self.
     */
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

    /**
     * Request a page by number.
     * @param  {Integer|Number} page=1 The required page.
     * @return {Object}                Returns self.
     */
    page(page) {
        page = page || 1;
        this._getPage(page);
        return this;
    }

    /**
     * Get the next page from the currently
     * set position.
     * @return {Object} Returns self.
     */
    next() {
        this._getPage(this.pages.next);
        return this;
    }

    /**
     * Get the previous page from the currently
     * set position.
     * @return {Object} Returns self.
     */
    previous() {
        this._getPage(this.pages.previous);
        return this;
    }
}

export default PaginatedCollection;
