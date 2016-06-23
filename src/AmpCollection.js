import FingerPrint from './FingerPrint.js';

/**
 * Allows the creation and search of a given array of data.
 * @class
 * @classdesc The core AmpCollection class.
 */
class AmpCollection {
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
        this.processed = [];
        /**
         * Whether the data has changed/processed.
         * @type {Boolean}
         */
        this._isProcessed = false;

        return this;
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
            this.data = data;
        } else {
            this.data.push(data);
        }

        this.data = this.FingerPrint.addPrints(this.data);
    }

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
            console.log(
                'Collection:',
                'Schema in strict mode -- keys do not match. Expecting:',
                this._schema,
                'given;',
                dataKeys
            );
            window.stop();
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
                console.log(
                    'Collection:',
                    'key "' + this._schema[key] + '" missing from collection.'
                );
            }
        }

        return data;
    }

    /**
     * Get all the data or processed data.
     * @returns {Array} The data in the Collection
     */
    all() {
        return this._data;
    }

    /**
     * First item in the data or processed data.
     * @returns {Object} The first item in the Collection
     */
    first() {
        return this._data[0];
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

        return this._data[item];
    }

    /**
     * Add an item to the list of data.
     * @param {(Object|String)} value Item to add
     * @returns {Object}              Returns self
     */
    addItem(value) {
        this.data.push(this.checkSchema(value));
        this.data = this.FingerPrint.addPrints(this.data);

        return this;
    }

    /**
     * Checks if Collection has a matching key.
     * @param  {String}  key Key to seek
     * @return {(Boolean|Object)} Returns false or self if match.
     */
    has(key) {
        for(let item = 0; item < this.data.length; item++) {
            if(typeof this.data[item][key] === 'undefined') {
                return false;
            }
        }

        return this;
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
     * Alias for doWhere to create list of processed items.
     * @param  {String} key         Key to seek
     * @param  {String} operator    Operator to be used in comparison
     * @param  {String} value       Value to match
     * @return {Object}             Returns result of doWhere
     */
    where(key, operator, value) {
        if(arguments.length === 2) {
            value       = operator
            operator    = '=';
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
            value       = operator
            operator    = '=';
        }

        return this.doWhere(this.processed, key, operator, value);
    }

    /**
     * Gets items that are unique in the collection. Uses the item FingerPrint
     * to find and remove duplicates. By using a key you can specify
     * finding duplicates by an alternative match.
     * @param   {String} key=__FingerPrint__   Key to find uniques by
     * @return  {object}                Return self
     */
    unique(key) {
        key = key || '__FingerPrint__';
        let stored = [];

        for(let item = 0; item < this.data.length; item++) {
            let value = this.data[item][key];

            // console.log('value ', this.data[item]);

            this.doWhere([], key, '=', value);

            if(this.processed.length === 1) {
                stored.push(this.processed[0]);
            }
        }

        this.processed = stored;

        return this;
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
        this._processed = processed;

        for(let item = 0; item < this.data.length; item++) {
            if(typeof this.data[item][key] === 'undefined') {
                return this;
            }

            let where = this._whereOperators(this.data[item][key], operator, value);

            if(where) {
                this.processed.push(this.data[item]);
            }
        }

        return this;
    }

    /**
     * Resets the processed data collection back to
     * its original state
     * @return {Object}             Return self
     */
    reset() {
        this.processed = this.data;

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

        this.processed = removed;

        return this;
    }
}

export default AmpCollection;
