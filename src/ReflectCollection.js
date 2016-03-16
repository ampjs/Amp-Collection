class ReflectCollection {
    constructor(data) {
        this.setData = data || [];
        this.processed = [];
        this.__isProcessed = false;
    }

    /**
     * Getter for the processed or standard data.
     * @return {Array}     Returns the data
     */
    get __data() {
        if(this.__isProcessed) {
            return this.processed;
        }

        return this.data;
    }

    /**
     * Setter for processed data.
     * @param  {Array} processed Items of data that have been ran through a filter.
     * @return {null}           Returns nothing.
     */
    set __processed(processed) {
        // We're creating a filter so make sure we're aware.
        this.__isProcessed = true;
        // Add passed array to processed object.
        this.processed = processed;
    }

    /**
     * Setter for the data to be used in the collection.
     * @param {(String|Array)} data - data to be added
     */
    set setData(data) {
        if(Array.isArray(data)) {
            this.data = data;
        } else {
            this.data = [];
            this.data.push(data);
        }
    }

    /**
     * Create the schema for the current Collection.
     * @param {Array} keys - a list of keys to match
     * @param {Bool} strict - sets strict mode
     * @returns {Object} Returns self.
     */
    schema(keys, strict) {
        this.schema = keys.sort();
        this.schemaStrict = strict || false;

        return this;
    }

    /**
     * Checks whether the data passed to the Collection
     * matches the set schema.
     * @param  {Array} data Array of the data to check
     * @return {Array}      The data being checked.
     */
    checkSchema(data) {
        if(!Array.isArray(this.schema)) {
            return data;
        }

        if(this.schemaStrict) {
            return this.__strictSchema(data);
        }

        return this.__nonStrictSchema(data);
    }

    /**
     * Strictly checks the schema and throws
     * and stop if check doesn't pass.
     * @param  {Array} data Object of data to process
     * @return {Null}       Return nothing
     */
    __strictSchema(data) {
        let dataKeys = Object.keys(data).sort();

        if(JSON.stringify(dataKeys) !== JSON.stringify(this.schema)) {
            console.log(
                'Collection:',
                'Schema in strict mode -- keys do not match. Expecting:',
                this.schema,
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
     * @param  {Array} data Object of data to process
     * @return {Object}     Returns the data passed
     */
    __nonStrictSchema(data) {
        for(let key = 0; key < this.schema.length; key++) {
            if(!data.hasOwnProperty(this.schema[key])) {
                console.log(
                    'Collection:',
                    'key "${this.schema[i]}" missing from collection.'
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
        return this.__data;
    }

    /**
     * First item in the data or processed data.
     * @returns {Object} The first item in the Collection
     */
    first() {
        return this.__data[0];
    }

    /**
     * Get the specified item from the data or processed data.
     * @param  {Number} item Number of item to get
     * @return {Object|Null}   Null if no data found or object defined.
     */
    get(item) {
        if(typeof this.__data[item] === 'undefined') {
            return null;
        }

        return this.__data[item];
    }

    /**
     * Add an item to the list of data.
     * @param {(Object|String)} value Item to add
     * @returns {Object}              Returns self
     */
    addItem(value) {
        this.data.push(this.checkSchema(value));

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
        let values = this.__data;

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
        for(let item = 0; item < this.__data.length; item++) {
            this.__data[item] = filter(item, this.get(item));
        }

        return this;
    }

    /**
     * Alias for doWhere to create list of processed items.
     * @param  {String} key   Key to seek
     * @param  {String} value Value to match
     * @return {Object}       Returns result of doWhere
     */
    where(key, value) {
        return this.doWhere([], key, value);
    }

    /**
     * Alias for doWhere on processed items as an orWhere,
     * similar to SQL queries.
     * @param  {String} key   Key to seek
     * @param  {String} value Value to match
     * @return {Object}       Returns result of doWhere
     */
    orWhere(key, value) {
        return this.doWhere(this.processed, key, value);
    }

    /**
     * Loops through items and builds or extends processed
     * Array with items that match key and value.
     * @param  {Array}  processed The current processed items
     * @param  {String} key      Key to seek
     * @param  {String} value    Value to match
     * @return {Object}          Return self
     */
    doWhere(processed, key, value) {
        this.__processed = processed;

        for(let item = 0; item < this.data.length; item++) {
            let keyExists = typeof this.data[item][key] !== 'undefined';

            if(keyExists && this.data[item][key] === value) {
                this.processed.push(this.data[item]);
            }
        }

        return this;
    }

    /**
     * Remove specified items from the data or processed data.
     * @param  {Array}  except A list of items to exclude
     * @return {Object}        Return self
     */
    except(except) {
        this.__processed = this.__data;

        for(let item = 0; item < this.processed.length; item++) {
            for(let eitem = 0; eitem < except.length; eitem++) {
                let key = except[eitem];

                if(typeof this.processed[item][key] !== 'undefined') {
                    Reflect.deleteProperty(this.processed[item], key);
                }
            }
        }

        return this;
    }
}

export default ReflectCollection;
