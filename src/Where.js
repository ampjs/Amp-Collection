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

export default Where;
