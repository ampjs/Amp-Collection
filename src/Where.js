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

export default Where;
