class Helpers {
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
}

export default Helpers;
