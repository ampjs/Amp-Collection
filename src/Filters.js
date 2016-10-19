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
     * @param   {String} key=__FingerPrint__   Key to find uniques by
     * @return  {object}                Return self
     */
    unique(key) {
        key = key || '__FingerPrint__';
        let stored = [];

        for(let item = 0; item < this.data.length; item++) {
            let value = this.data[item][key];

            this.doWhere([], key, '=', value);

            if(this.processed.length === 1) {
                stored.push(this.processed[0]);
            }
        }

        this.processed = stored;

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

        this.processed = removed;

        return this;
    }
}

export default Filters;
