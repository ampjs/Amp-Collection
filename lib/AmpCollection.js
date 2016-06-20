'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FingerPrint = require('./FingerPrint.js');

var _FingerPrint2 = _interopRequireDefault(_FingerPrint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AmpCollection = function () {
    /**
     * Construct the class
     * @param  {Array}  data=[]    The given data to add to a collection.
     * @return {Object}            Returns self
     */

    function AmpCollection(data) {
        _classCallCheck(this, AmpCollection);

        this.FingerPrint = new _FingerPrint2.default();

        this.setData = data || [];
        this.processed = [];
        this._isProcessed = false;

        return this;
    }

    /**
     * Getter for the processed or standard data.
     * @private
     * @return {Array}     Returns the data
     */


    _createClass(AmpCollection, [{
        key: 'schema',


        /**
         * Create the schema for the current Collection.
         * @param {Array}   keys            A list of keys to match
         * @param {Bool}    strict=false    Sets strict mode
         * @returns {Object}                Returns self.
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

    }, {
        key: '_strictSchema',
        value: function _strictSchema(data) {
            var dataKeys = Object.keys(data).sort();

            if (JSON.stringify(dataKeys) !== JSON.stringify(this.schema)) {
                console.log('Collection:', 'Schema in strict mode -- keys do not match. Expecting:', this.schema, 'given;', dataKeys);
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

    }, {
        key: '_nonStrictSchema',
        value: function _nonStrictSchema(data) {
            for (var key = 0; key < this.schema.length; key++) {
                if (!data.hasOwnProperty(this.schema[key])) {
                    console.log('Collection:', 'key "' + this.schema[key] + '" missing from collection.');
                }
            }

            return data;
        }

        /**
         * Get all the data or processed data.
         * @returns {Array} The data in the Collection
         */

    }, {
        key: 'all',
        value: function all() {
            return this._data;
        }

        /**
         * First item in the data or processed data.
         * @returns {Object} The first item in the Collection
         */

    }, {
        key: 'first',
        value: function first() {
            return this._data[0];
        }

        /**
         * Get the specified item from the data or processed data.
         * @param  {Number}     item Number of item to get
         * @return {Object|Null}     Null if no data found or object defined.
         */

    }, {
        key: 'get',
        value: function get(item) {
            if (typeof this._data[item] === 'undefined') {
                return null;
            }

            return this._data[item];
        }

        /**
         * Add an item to the list of data.
         * @param {(Object|String)} value Item to add
         * @returns {Object}              Returns self
         */

    }, {
        key: 'addItem',
        value: function addItem(value) {
            this.data.push(this.checkSchema(value));
            this.data = this.FingerPrint.addPrints(this.data);

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
            for (var item = 0; item < this.data.length; item++) {
                if (typeof this.data[item][key] === 'undefined') {
                    return false;
                }
            }

            return this;
        }

        /**
         * Check if data or processed data has any items.
         * @return {Boolean}    Returns boolean
         */

    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            var values = this._data;

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
            for (var item = 0; item < this._data.length; item++) {
                this._data[item] = _filter(item, this.get(item));
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

    }, {
        key: 'where',
        value: function where(key, operator, value) {
            if (arguments.length === 2) {
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

    }, {
        key: 'orWhere',
        value: function orWhere(key, operator, value) {
            if (arguments.length === 2) {
                value = operator;
                operator = '=';
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

    }, {
        key: 'unique',
        value: function unique(key) {
            key = key || '__FingerPrint__';
            var stored = [];

            for (var item = 0; item < this.data.length; item++) {
                var value = this.data[item][key];

                // console.log('value ', this.data[item]);

                this.doWhere([], key, '=', value);

                if (this.processed.length === 1) {
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

    }, {
        key: 'doWhere',
        value: function doWhere(processed, key, operator, value) {
            this._processed = processed;

            for (var item = 0; item < this.data.length; item++) {
                if (typeof this.data[item][key] === 'undefined') {
                    return this;
                }

                var where = this._whereOperators(this.data[item][key], operator, value);

                if (where) {
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

    }, {
        key: 'reset',
        value: function reset() {
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

    }, {
        key: '_whereOperators',
        value: function _whereOperators(key, operator, value) {
            switch (operator) {
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

    }, {
        key: 'except',
        value: function except(_except) {
            this._processed = this._data;
            var removed = [];

            for (var item = 0; item < this.processed.length; item++) {
                var items = this.processed[item];

                removed[item] = {};

                for (var name in items) {
                    if (_except.indexOf(name) === -1) {
                        removed[item][name] = items[name];
                    }
                }
            }

            this.processed = removed;

            return this;
        }
    }, {
        key: '_data',
        get: function get() {
            if (this._isProcessed) {
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

    }, {
        key: '_processed',
        set: function set(processed) {
            // We're creating a filter so make sure we're aware.
            this._isProcessed = true;
            // Add passed array to processed object.
            this.processed = processed;
        }

        /**
         * Setter for the data to be used in the collection.
         * @param {(String|Array)} data Data to be added
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

            this.data = this.FingerPrint.addPrints(this.data);
        }
    }]);

    return AmpCollection;
}();

exports.default = AmpCollection;