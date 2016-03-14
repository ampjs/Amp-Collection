'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReflectCollection = function () {
    function ReflectCollection(data) {
        _classCallCheck(this, ReflectCollection);

        this.setData = data || [];
        this.filtered = [];
        this.__isFiltered = false;
    }

    /**
     * Getter for the filtered or standard data.
     * @return {Array}
     */


    _createClass(ReflectCollection, [{
        key: 'schema',


        /**
         * Create the schema for the current Collection.
         * @param {Array} keys - a list of keys to match
         * @param {Bool} strict - sets strict mode
         * @returns {Object} Returns self.
         */
        value: function schema(keys, strict) {
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

    }, {
        key: 'checkSchema',
        value: function checkSchema(data) {
            if (!Array.isArray(this.schema)) {
                return data;
            }

            if (this.schemaStrict) {
                var dataKeys = Object.keys(data).sort(),
                    compare = JSON.stringify(dataKeys) === JSON.stringify(this.schema);

                if (!compare) {
                    console.log('Collection: Schema in strict mode -- keys do not match. Expecting: ', this.schema, 'given; ', dataKeys);
                    window.stop();
                    return;
                }
            }

            for (var i in this.schema) {
                var key = this.schema[i];

                if (!data.hasOwnProperty(key)) {
                    console.log('Collection: key "' + key + '" missing from collection.');
                }
            }

            return data;
        }

        /**
         * Get all the data or filtered data.
         * @returns {Array} The data in the Collection
         */

    }, {
        key: 'all',
        value: function all() {
            return this.__data;
        }

        /**
         * First item in the data or filtered data.
         * @returns {Object} The first item in the Collection
         */

    }, {
        key: 'first',
        value: function first() {
            return this.__data[0];
        }

        /**
         * Get the specified item from the data or filtered data.
         * @param  {Number} i Number of item to get
         * @return {Object|Null}   Null if no data found or object defined.
         */

    }, {
        key: 'get',
        value: function get(i) {
            if (typeof this.__data[i] === 'undefined') {
                return null;
            }

            return this.__data[i];
        }

        /**
         * Add an item to the list of data.
         * @param {(Object|String)} data Item to add
         * @returns {Object}             Returns self
         */

    }, {
        key: 'add',
        value: function add(data) {
            this.data.push(this.checkSchema(data));
            return this;
        }

        /**
         * Checks if Collection has a matching key.
         * @param  {String}  key Key to seek
         * @return {(Boolean|Object)} Returns false or self if match.
         */

    }, {
        key: 'has',
        value: function has(key) {
            for (var i in this.data) {
                if (typeof this.data[i][key] === 'undefined') {
                    return false;
                }
            }

            return this;
        }

        /**
         * Check if data or filtered data has any items.
         * @return {Boolean}
         */

    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            var values = this.__data;

            if (values.length > 0) {
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

    }, {
        key: 'filter',
        value: function filter(_filter) {
            for (var i in this.__data) {
                this.__data[i] = _filter(i, this.get(i));
            }

            return this;
        }

        /**
         * Alias for doWhere to create list of filtered items.
         * @param  {String} key   Key to seek
         * @param  {String} value Value to match
         * @return {Object}       Returns result of doWhere
         */

    }, {
        key: 'where',
        value: function where(key, value) {
            return this.doWhere([], key, value);
        }

        /**
         * Alias for doWhere on filtered items as an orWhere,
         * similar to SQL queries.
         * @param  {String} key   Key to seek
         * @param  {String} value Value to match
         * @return {Object}       Returns result of doWhere
         */

    }, {
        key: 'orWhere',
        value: function orWhere(key, value) {
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

    }, {
        key: 'doWhere',
        value: function doWhere(filtered, key, value) {
            // We're creating a filter so make sure we're aware.
            this.__isFiltered = true;
            // Add passed array to filtered object.
            this.filtered = filtered;

            for (var i in this.data) {
                if (typeof this.data[i][key] !== 'undefined' && this.data[i][key] === value) {
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

    }, {
        key: 'except',
        value: function except(_except) {
            this.__isFiltered = true;
            this.filtered = this.__data;

            for (var i in this.filtered) {
                for (var e in _except) {
                    var key = _except[e];
                    if (typeof this.filtered[i][key] !== 'undefined') {
                        delete this.filtered[i][key];
                    }
                }
            }

            return this;
        }
    }, {
        key: '__data',
        get: function get() {
            if (this.__isFiltered) {
                return this.filtered;
            }

            return this.data;
        }

        /**
         * Setter for the data to be used in the collection.
         * @param {(String|Array)} data - data to be added
         */

    }, {
        key: 'setData',
        set: function set(data) {
            if (Array.isArray(data)) {
                this.data = data;
            } else {
                this.data = [];
                this.data.push(data);
            }
        }
    }]);

    return ReflectCollection;
}();

;

exports.default = ReflectCollection;