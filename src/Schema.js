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

export default Schema;
