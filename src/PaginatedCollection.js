import Collection from './Collection.js';

/**
 * Extends on Collection and allows for pagination
 * of the data to be used.
 * @class
 * @classdesc Pagination class for Collection
 */
class PaginatedCollection extends Collection {

    /**
     * Construct the class
     * @param  {Array}      data        The given data to add to a collection.
     * @param  {Integer}    size=false  The amount of chunks to be used per-page.
     * @return {Object}                 Returns self
     */
    constructor(data, size) {
        super(data);

        let chunks = size || false;

        /**
         * Holds information reguarding to
         * the position of the currently
         * viewed page.
         * @type {Object}
         */
        this.pages = {};

        if(chunks) {
            this.paginate(chunks);
        }
    }

    /**
     * Chunks the data based on the given size.
     * @param  {Integer} size=5 The amount of chunks to be used per-page.
     * @return {Object}         Returns self.
     */
    paginate(size) {
        let chunks = size || 5,
            sets = [];

        chunks = this.data.length / chunks;

        for(let c = 0, i = 0; i < chunks; i += 1, c += size) {
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
         * is handled by Collection.
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
        let nextPage = page + 1,
            // pageReference = page - 1,
            previousPage = page - 1;

        if(page >= this.pages.last) {
            nextPage = this.pages.last;
        }

        if(page <= 1) {
            previousPage = 1;
        }

        this._setPages(page, nextPage, previousPage);

        this._processed = this._data[page - 1];
    }

    /**
     * Sets the page object.
     * @param {Integer|Number}  page            The current page
     * @param {Integer|Number}  nextPage        The next page
     * @param {Integer|Number}  previousPage    The previous page
     * @return {void}
     */
    _setPages(page, nextPage, previousPage) {
        this.pages.current = page;
        this.pages.next = nextPage;
        this.pages.previous = previousPage;
    }

    /**
     * Request a page by number.
     * @param  {Integer|Number} page=1 The required page.
     * @return {Object}                Returns self.
     */
    page(page) {
        let getPage = page || 1;

        this._getPage(getPage);

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
