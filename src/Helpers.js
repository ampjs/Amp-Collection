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

export default Helpers;
