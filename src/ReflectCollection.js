class ReflectCollection {
    constructor(data) {
        this.setData = data || [];
        this.filtered = [];
        this.__isFiltered = false;
    }

    /**
     * Getter for the filtered or standard data.
     * @return {Array}
     */
    get __data() {
        if(this.__isFiltered) {
            return this.filtered;
        }

        return this.data;
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
            var dataKeys = Object.keys(data).sort(),
                compare = (JSON.stringify(dataKeys) === JSON.stringify(this.schema));

            if(!compare) {
                console.log('Collection: Schema in strict mode -- keys do not match. Expecting: ', this.schema, 'given; ', dataKeys);
                window.stop();
                return;
            }
        }

        for(var i in this.schema) {
            var key = this.schema[i];

            if(!data.hasOwnProperty(key)) {
                console.log('Collection: key "' + key + '" missing from collection.');
            }
        }

        return data;
    }

    /**
     * Get all the data or filtered data.
     * @returns {Array} The data in the Collection
     */
    all() {
        return this.__data;
    }

    /**
     * First item in the data or filtered data.
     * @returns {Object} The first item in the Collection
     */
    first() {
        return this.__data[0];
    }

    /**
     * Get the specified item from the data or filtered data.
     * @param  {Number} i Number of item to get
     * @return {Object|Null}   Null if no data found or object defined.
     */
    get(i) {
        if(typeof this.__data[i] === 'undefined') {
            return null;
        }

        return this.__data[i];
    }

    /**
     * Add an item to the list of data.
     * @param {(Object|String)} data Item to add
     * @returns {Object}             Returns self
     */
    add(data) {
        this.data.push(this.checkSchema(data));
        return this;
    }

    /**
     * Checks if Collection has a matching key.
     * @param  {String}  key Key to seek
     * @return {(Boolean|Object)} Returns false or self if match.
     */
    has(key) {
        for(var i in this.data) {
            if(typeof this.data[i][key] === 'undefined') {
                return false;
            }
        }

        return this;
    }

    /**
     * Check if data or filtered data has any items.
     * @return {Boolean}
     */
    isEmpty() {
        var values = this.__data;

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
        for(var i in this.__data) {
            this.__data[i] = filter(i, this.get(i));
        }

        return this;
    }

    /**
     * Alias for doWhere to create list of filtered items.
     * @param  {String} key   Key to seek
     * @param  {String} value Value to match
     * @return {Object}       Returns result of doWhere
     */
    where(key, value) {
        return this.doWhere([], key, value);
    }

    /**
     * Alias for doWhere on filtered items as an orWhere,
     * similar to SQL queries.
     * @param  {String} key   Key to seek
     * @param  {String} value Value to match
     * @return {Object}       Returns result of doWhere
     */
    orWhere(key, value) {
        return this.doWhere(this.filtered, key, value);
    }

    /**
     * Loops through items and builds or extends filtered
     * Array with items that match key and value.
     * @param  {Array}  filtered The current filtered items
     * @param  {String} key      Key to seek
     * @param  {String} value    Value to match
     * @return {Object}          Return self
     */
    doWhere(filtered, key, value) {
        // We're creating a filter so make sure we're aware.
        this.__isFiltered = true;
        // Add passed array to filtered object.
        this.filtered = filtered;

        for(var i in this.data) {
            if(typeof this.data[i][key] !== 'undefined' && this.data[i][key] === value) {
                this.filtered.push(this.data[i]);
            }
        }

        return this;
    }

    /**
     * Remove specified items from the data or filtered data.
     * @param  {Array}  except A list of items to exclude
     * @return {Object}        Return self
     */
    except(except) {
        this.__isFiltered = true;
        this.filtered = this.__data;

        for(var i in this.filtered) {
            for(var e in except) {
                var key = except[e];
                if(typeof this.filtered[i][key] !== 'undefined') {
                    delete this.filtered[i][key];
                }
            }
        }

        return this;
    }
};

export default ReflectCollection;
