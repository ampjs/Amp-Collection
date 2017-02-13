'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Filters = require('./Filters.js');

var _Filters2 = _interopRequireDefault(_Filters);

var _FingerPrint = require('./FingerPrint.js');

var _FingerPrint2 = _interopRequireDefault(_FingerPrint);

var _Helpers = require('./Helpers.js');

var _Helpers2 = _interopRequireDefault(_Helpers);

var _implements = require('@ampersarnie/implements');

var _Schema = require('./Schema.js');

var _Schema2 = _interopRequireDefault(_Schema);

var _Where = require('./Where.js');

var _Where2 = _interopRequireDefault(_Where);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Allows the creation and search of a given array of data.
 * @class
 * @classdesc The core Collection class.
 * @implements {Trait|Filters}
 * @implements {Trait|FingerPrint}
 * @implements {Trait|Helpers}
 * @implements {Trait|Schema}
 * @implements {Trait|Where}
 * @implements {Implements}
 */
var Collection = function () {

    /**
     * Construct the class
     * @param  {Array}  data=[]    The given data to add to a collection.
     * @return {Object}            Returns self
     */
    function Collection(data) {
        _classCallCheck(this, Collection);

        /**
         * FingerPrint class allowing the use of
         * methods for creating item hashes.
         * @type {Class}
         */
        this.FingerPrint = new _FingerPrint2.default();

        /**
         * Set the inital value of the data.
         * @type {Array}
         */
        this.data = [];
        this.setData = data || [];

        /**
         * Holds all data that has changed with
         * each query.
         * @type {Array}
         */
        this._processed = [];

        /**
         * Whether the data has changed/processed.
         * @type {Boolean}
         */
        this._isProcessed = false;

        return this;
    }

    /**
     * Traits to use
     * @return {Array}  Array of classes to use as traits.
     */


    _createClass(Collection, [{
        key: 'traits',
        value: function traits() {
            return [_Where2.default, _Helpers2.default, _Schema2.default, _Filters2.default];
        }

        /**
         * Getter for the processed or standard data.
         * @private
         * @return {Array}     Returns the data
         */

    }, {
        key: 'nestedCollection',


        /**
         * Creates a nested collection.
         * @param   {Object}    data    Object to create the nested collection from.
         * @return  {Object}            Returns the data after processing.
         */
        value: function nestedCollection(data) {
            var value = {};

            for (var i in data) {
                for (var item in data[i]) {
                    value = data[i][item];

                    // @TODO: Tidy up.
                    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && _typeof(value[0]) === 'object') {
                        data[i][item] = new Collection(value);
                    }
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
            // Reset the data
            var data = this._data;

            this.reset();

            return data;
        }

        /**
         * First item in the data or processed data.
         * @returns {Object} The first item in the Collection
         */

    }, {
        key: 'first',
        value: function first() {
            var data = this._data[0];

            this.reset();

            return data;
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

            var data = this._data[item];

            this.reset();

            return data;
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
            this.setData = this.data;

            return this;
        }
    }, {
        key: 'addItems',
        value: function addItems() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this.data.push.apply(this.data, value);
            this.setData = this.data;

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
            this._processed = this.data;
            this._isProcessed = false;

            return this;
        }

        /**
         * Checks if string is dot notated.
         * @param   {String}  key   Dot notated string
         * @return  {Boolean}       Whether is dot notated
         */

    }, {
        key: '_isDotNotation',
        value: function _isDotNotation() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return key.indexOf('.') !== -1;
        }

        /**
         * Splits the dot notation into an Array.
         * @param   {String}    key Dot notated string
         * @return  {Array}         Array of keys
         */

    }, {
        key: '_getDotNotation',
        value: function _getDotNotation() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return key.split('.');
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

            /**
             * The data that has been set for the Collection.
             * @type {Array}
             */
            this.data = [];

            if (Array.isArray(data)) {
                this.data = this.nestedCollection(data);
            } else {
                this.data.push(data);
            }

            this.data = this.FingerPrint.addPrints(this.data);
        }
    }]);

    return Collection;
}();

exports.default = new _implements.Implements(Collection);