(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@ampersarnie/implements')) :
	typeof define === 'function' && define.amd ? define(['@ampersarnie/implements'], factory) :
	(factory(global['@ampersarnie/implements']));
}(this, (function (_ampersarnie_implements) { 'use strict';

/**
 * Methods of filtering through the collection data.
 * @class
 * @classdesc Filter class/trait for Collections.
 */
class Filters {

    /**
     * Iterate through each item and run through
     * a passed filter function/callback.
     * @param  {Function} filter Callback filter
     * @return {Object}          Returns self.
     */
    filter(filter) {
        for(let item = 0; item < this._data.length; item++) {
            this._data[item] = filter(item, this.get(item));
        }

        return this;
    }

    /**
     * Gets items that are unique in the collection. Uses the item FingerPrint
     * to find and remove duplicates. By using a key you can specify
     * finding duplicates by an alternative match.
     * @param   {String} key=__FingerPrint__    Key to find uniques by
     * @return  {object}                        Return self
     */
    unique(key) {
        let stored = [],
            uniqueKey = key || '__FingerPrint__';

        for(let item = 0; item < this.data.length; item++) {
            let value = this.data[item][uniqueKey];

            this.doWhere([], uniqueKey, '=', value);

            if(this.processed.length === 1) {
                stored.push(this.processed[0]);
            }
        }

        /**
         * Collection object of data that
         * has been filtered and/or processed
         * somewhere in the chain.
         * @type {Array}
         */
        this._processed = stored;

        return this;
    }

    /**
     * Only retrieve the requested keys.
     * @param   {Array}   keys  A list of keys to include.
     * @return  {Object}        Return self.
     */
    only(keys) {
        let new_processed = [];

        for(let key in keys) {
            for(let data in this._data) {
                if(typeof new_processed[data] === 'undefined') {
                    new_processed[data] = [];
                }

                new_processed[data][keys[key]] = this._data[data][keys[key]];
            }
        }

        /**
         * Collection object of data that
         * has been filtered and/or processed
         * somewhere in the chain.
         * @type {Array}
         */
        this._processed = new_processed;

        return this;
    }

    /**
     * Remove specified items from the data or processed data.
     * @param  {Array}  except A list of items to exclude
     * @return {Object}        Return self
     */
    except(except) {
        this._processed = this._data;
        let removed = [];

        for(let item = 0; item < this.processed.length; item++) {
            let items = this.processed[item];

            removed[item] = {};

            for(let name in items) {
                if(except.indexOf(name) === -1) {
                    removed[item][name] = items[name];
                }
            }
        }

        /**
         * Collection object of data that
         * has been filtered and/or processed
         * somewhere in the chain.
         * @type {Array}
         */
        this._processed = removed;

        return this;
    }
}

/**
 * Allows the creation of FingerPrints on an Array
 * @class
 * @classdesc Allows the creation of FingerPrints on an Array
 */
class FingerPrint {

    /**
     * Hash generation based on Java numerical
     * hashCode().
     * http://jsperf.com/string-hashing-methods/4
     * @param  {String} string String of data to be hashed
     * @return {Number}        Hashed number
     */
    generate(string) {
        let hash = 0,
            schar = 0;

        if(string.length === 0) {
            return hash;
        }

        for(let i = 0; i < string.length; i++) {
            schar = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + schar;
            // Convert to 32bit integer
            hash &= hash;
        }

        return Math.abs(hash);
    }

    /**
     * Creates a getter for the hashed values
     * meaning it cannot be overwrote and faked.
     * @param  {Array} array The array of data to be hashed
     * @return {Array}       The passed data with a getter attached
     */
    createGetter(array) {
        let string = JSON.stringify(array);

        if(array.__FingerPrint__) {
            return array;
        }

        Object.defineProperty(array, '__FingerPrint__', {
            enumerable: false,
            get: () => {
                return this.generate(string);
            }
        });

        return array;
    }

    /**
     * Loops through the passed Array of data
     * and adds the getter to each item.
     * @param  {Array} data Full data to be hashed
     * @return {Array}      Full data with new hashes
     *
     */
    addPrints(data) {
        if(!Array.isArray(data)) {
            return this.createGetter(data);
        }

        for(let i = 0; i < data.length; i++) {
            data[i] = this.createGetter(data[i]);
        }

        return data;
    }
}

/**
 * Methods to act as helpers for various uses
 * when checking collection data.
 * @class
 * @classdesc Helper class/trait for Collections.
 */
class Helpers {

    /**
     * Checks if Collection has a matching key.
     * @param  {String}  key Key to seek
     * @return {(Boolean|Object)} Returns false or self if match.
     */
    has(key) {
        let found = false;

        for(let item = 0; item < this.data.length; item++) {
            if(this._isDotNotation(key)) {
                found = this._dotNotatedHas(this.data[item], key);
            } else {
                found = this._singularHas(this.data[item], key);
            }
        }

        return found;
    }

    /**
     * Performs the "has" check if the key is
     * using dot-notation.
     * @param   {Object|Array}  item    The collection item to check.
     * @param   {String}        dot_key Key in the dot-notation format.
     * @return  {Boolean}               Boolean value depending on whether
     *                                  the check is successful or not.
     */
    _dotNotatedHas(item, dot_key) {
        let key = '',
            notation = this._getDotNotation(dot_key),
            processed_item = item;

        for(let nkey in notation) {
            key = notation[nkey];

            if(typeof processed_item[key] === 'undefined') {
                return false;
            }

            processed_item = processed_item[key];
        }

        return true;
    }

    /**
     * Performs the "has" check if the key is
     * using a sigular, non-dot-notated key.
     * @param   {Object|Array}  item    The collection item to check.
     * @param   {String}        key     Key to check.
     * @return  {Boolean}               Boolean value depending on whether
     *                                  the check is successful or not.
     */
    _singularHas(item, key) {
        if(typeof item[key] === 'undefined') {
            return false;
        }

        return true;
    }

    /**
     * Check if data or processed data has any items.
     * @return {Boolean}    Returns boolean
     */
    isEmpty() {
        let values = this._data;

        if(values.length > 0) {
            return false;
        }

        return true;
    }
}

/**
 * Methods to act as schema checks when creating collection data.
 * @class
 * @classdesc Schema class/trait for Collections.
 */
class Schema {

    /**
     * Create the schema for the current Collection.
     * @param {Array}   keys            A list of keys to match
     * @param {Bool}    strict=false    Sets strict mode
     * @returns {Object}                Returns self.
     */
    schema(keys, strict) {

        /**
         * The schema to be used across this Collection.
         * @type {Array}
         */
        this._schema = keys.sort();

        /**
         * Whether the schema is set to strict.
         * @type {Boolean}
         */
        this._schemaStrict = strict || false;

        return this;
    }

    /**
     * Checks whether the data passed to the Collection
     * matches the set schema.
     * @param  {Array} data Array of the data to check
     * @return {Array}      The data being checked.
     */
    checkSchema(data) {
        if(!Array.isArray(this._schema)) {
            return data;
        }

        if(this._schemaStrict) {
            return this._strictSchema(data);
        }

        return this._nonStrictSchema(data);
    }

    /**
     * Strictly checks the schema and throws
     * and stop if check doesn't pass.
     * @private
     * @param  {Array} data Object of data to process
     * @return {Null}       Return nothing
     */
    _strictSchema(data) {
        let dataKeys = Object.keys(data).sort();

        if(JSON.stringify(dataKeys) !== JSON.stringify(this._schema)) {
            throw new Error('Collection: Schema in strict mode -- keys do not match.' +
                `Expecting: ${this._schema} - given; ${dataKeys}`);
        }

        return data;
    }

    /**
     * Checks the schema in a non strict fashion
     * and outputs any negative results to console.
     * @privte
     * @param  {Array} data Object of data to process
     * @return {Object}     Returns the data passed
     */
    _nonStrictSchema(data) {
        for(let key = 0; key < this._schema.length; key++) {
            if(!data.hasOwnProperty(this._schema[key])) {
                console.warn(
                    'Collection:',
                    `key "${this._schema[key]}" missing from collection.`
                );
            }
        }

        return data;
    }
}

/**
 * Methods for performaing queries on collection data.
 * @class
 * @classdesc Where class/trait for Collections.
 */
class Where {

    /**
     * Alias for doWhere to create list of processed items.
     * @param  {String} key         Key to seek
     * @param  {String} operator    Operator to be used in comparison
     * @param  {String} value       Value to match
     * @return {Object}             Returns result of doWhere
     */
    where(key, operator, value) {
        if(arguments.length === 2) {
            value = operator;
            operator = '=';
        }

        return this.doWhere([], key, operator, value);
    }

    /**
     * Alias for doWhere on processed items as an orWhere,
     * similar to SQL queries.
     * @param  {String} key         Key to seek
     * @param  {String} operator    Operator to be used in comparison
     * @param  {String} value       Value to match
     * @return {Object}             Returns result of doWhere
     */
    orWhere(key, operator, value) {
        if(arguments.length === 2) {
            value = operator;
            operator = '=';
        }

        return this.doWhere(this.processed, key, operator, value);
    }

    /**
     * Loops through items and builds or extends processed
     * Array with items that match key and value.
     * @param  {Array}  processed   The current processed items
     * @param  {String} key         Key to seek
     * @param  {String} operator    Operator to be used in comparison
     * @param  {String} value       Value to match
     * @return {Object}             Return self
     */
    doWhere(processed, key, operator, value) {
        /**
         * Collection object of data that
         * has been filtered and/or processed
         * somewhere in the chain.
         * @type {Array}
         */
        this._processed = processed;

        for(let item = 0; item < this.data.length; item++) {
            if(this._isDotNotation(key)) {
                this._dotNotatedWhere(this.data[item], key, operator, value);
            } else {
                this._singularWhere(item, this.data[item][key], operator, value);
            }
        }

        return this;
    }

    /**
     * Search an item using a dot notated key for recursive
     * where seaches.
     * @private
     * @param  {Object} item        Item to search within.
     * @param  {String} dot_key     Dot notated key
     * @param  {String} operator    Operator to be used in comparison
     * @param  {String} value       Value to match
     * @return {Object}             Self.
     */
    _dotNotatedWhere(item, dot_key, operator, value) {
        let key = '',
            notation = this._getDotNotation(dot_key),
            processed_item = item,
            where = false;

        for(let nkey in notation) {
            key = notation[nkey];

            if(typeof processed_item[key] !== 'undefined') {
                processed_item = processed_item[key];

                if(!Array.isArray(processed_item) && processed_item !== Object(processed_item)) {
                    where = this._whereOperators(processed_item, operator, value);
                    break;
                }
            }
        }

        if(where) {
            this.processed.push(item);
        }

        return this;
    }

    /**
     * Search an item using a singular key.
     * @private
     * @param  {Object} item        Item to search within.
     * @param  {Mixed}  data        Value to compare with.
     * @param  {String} operator    Operator to be used in comparison
     * @param  {String} value       Value to match
     * @return {Object}             Self
     */
    _singularWhere(item, data, operator, value) {
        if(typeof data === 'undefined') {
            return this;
        }

        let where = this._whereOperators(data, operator, value);

        if(where) {
            this.processed.push(this.data[item]);
        }

        return this;
    }

    /**
     * Does the comparison logic based on the given
     * operator.
     * @private
     * @param  {String} key         Key to seek
     * @param  {String} operator    Operator to be used in comparison
     * @param  {String} value       Value to match
     * @return {Boolean}            Returns whether matches or not.
     */
    _whereOperators(key, operator, value) {
        switch(operator) {
            default:
            case '=':
            case '==':
                return key == value;
            case '===':
                return key === value;
            case '>':
                return key > value;
            case '>=':
                return key >= value;
            case '<':
                return key < value;
            case '<=':
                return key <= value;
        }
    }
}

/**
 * Allows the creation and search of a given array of data.
 * @class
 * @classdesc The core Collection class.
 * @implements {Trait|Filters}
 * @implements {Trait|FingerPrint}
 * @implements {Trait|Helpers}
 * @implements {Trait|Schema}
 * @implements {Trait|Where}
 * @implements {Implements}
 */
class Collection {

    /**
     * Construct the class
     * @param  {Array}  data=[]    The given data to add to a collection.
     * @return {Object}            Returns self
     */
    constructor(data) {

        /**
         * FingerPrint class allowing the use of
         * methods for creating item hashes.
         * @type {Class}
         */
        this.FingerPrint = new FingerPrint();

        /**
         * Set the inital value of the data.
         * @type {Array}
         */
        this.data = [];
        this.setData = data || [];

        /**
         * Holds all data that has changed with
         * each query.
         * @type {Array}
         */
        this._processed = [];

        /**
         * Whether the data has changed/processed.
         * @type {Boolean}
         */
        this._isProcessed = false;

        return this;
    }

    /**
     * Traits to use
     * @return {Array}  Array of classes to use as traits.
     */
    traits() {
        return [Where, Helpers, Schema, Filters];
    }

    /**
     * Getter for the processed or standard data.
     * @private
     * @return {Array}     Returns the data
     */
    get _data() {
        if(this._isProcessed) {
            return this.processed;
        }

        return this.data;
    }

    /**
     * Setter for processed data.
     * @param  {Array} processed Items of data that have been ran through a filter.
     * @private
     * @return {void}            Returns nothing.
     */
    set _processed(processed) {
        // We're creating a filter so make sure we're aware.
        this._isProcessed = true;
        // Add passed array to processed object.
        this.processed = processed;
    }

    /**
     * Setter for the data to be used in the collection.
     * @param {(String|Array)} data Data to be added
     */
    set setData(data) {

        /**
         * The data that has been set for the Collection.
         * @type {Array}
         */
        this.data = [];

        if(Array.isArray(data)) {
            this.data = this.nestedCollection(data);
        } else {
            this.data.push(data);
        }

        this.data = this.FingerPrint.addPrints(this.data);
    }

    /**
     * Creates a nested collection.
     * @param   {Object}    data    Object to create the nested collection from.
     * @return  {Object}            Returns the data after processing.
     */
    nestedCollection(data) {
        let value = {};

        for(let i in data) {
            for(let item in data[i]) {
                value = data[i][item];

                // @TODO: Tidy up.
                if(typeof value === 'object' && value !== null && typeof value[0] === 'object') {
                    data[i][item] = new Collection(value);
                }
            }
        }

        return data;
    }

    /**
     * Get all the data or processed data.
     * @returns {Array} The data in the Collection
     */
    all() {
        // Reset the data
        let data = this._data;

        this.reset();

        return data;
    }

    /**
     * First item in the data or processed data.
     * @returns {Object} The first item in the Collection
     */
    first() {
        let data = this._data[0];

        this.reset();

        return data;
    }

    /**
     * Get the specified item from the data or processed data.
     * @param  {Number}     item Number of item to get
     * @return {Object|Null}     Null if no data found or object defined.
     */
    get(item) {
        if(typeof this._data[item] === 'undefined') {
            return null;
        }

        let data = this._data[item];

        this.reset();

        return data;
    }

    /**
     * Add an item to the list of data.
     * @param {(Object|String)} value Item to add
     * @returns {Object}              Returns self
     */
    addItem(value) {
        this.data.push(this.checkSchema(value));
        this.setData = this.data;

        return this;
    }

    addItems(value = []) {
        this.data.push.apply(this.data, value);
        this.setData = this.data;

        return this;
    }

    /**
     * Resets the processed data collection back to
     * its original state
     * @return {Object}             Return self
     */
    reset() {
        this._processed = this.data;
        this._isProcessed = false;

        return this;
    }

    /**
     * Checks if string is dot notated.
     * @param   {String}  key   Dot notated string
     * @return  {Boolean}       Whether is dot notated
     */
    _isDotNotation(key = '') {
        return (key.indexOf('.') !== -1);
    }

    /**
     * Splits the dot notation into an Array.
     * @param   {String}    key Dot notated string
     * @return  {Array}         Array of keys
     */
    _getDotNotation(key = '') {
        return key.split('.');
    }
}

var Collection$1 = new _ampersarnie_implements.Implements(Collection);

/**
 * Extends on Collection and allows for pagination
 * of the data to be used.
 * @class
 * @classdesc Pagination class for Collection
 */
class PaginatedCollection extends Collection$1 {

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

window.Collection = Collection$1;
window.PaginatedCollection = PaginatedCollection;

module.exports = {
    Collection: Collection$1,
    PaginatedCollection: PaginatedCollection
};

})));
