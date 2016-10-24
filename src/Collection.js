import Filters from './Filters.js';
import FingerPrint from './FingerPrint.js';
import Helpers from './Helpers.js';
import {Implements} from '@ampersarnie/implements';
import Schema from './Schema.js';
import Where from './Where.js';

/**
 * Allows the creation and search of a given array of data.
 * @class
 * @classdesc The core Collection class.
 */
class Collection {

    /**
     * Construct the class
     * @param  {Array}  data=[]    The given data to add to a collection.
     * @return {Object}            Returns self
     */
    constructor(data) {

        /**
         * FingerPrint class allowing the use of
         * methods for creating item hashes.
         * @type {Class}
         */
        this.FingerPrint = new FingerPrint();

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
        this.processed = [];

        /**
         * Whether the data has changed/processed.
         * @type {Boolean}
         */
        this._isProcessed = false;

        return this;
    }

    traits() {
        return [Where, Helpers, Schema, Filters];
    }

    /**
     * Getter for the processed or standard data.
     * @private
     * @return {Array}     Returns the data
     */
    get _data() {
        if(this._isProcessed) {
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
    set _processed(processed) {
        // We're creating a filter so make sure we're aware.
        this._isProcessed = true;
        // Add passed array to processed object.
        this.processed = processed;
    }

    /**
     * Setter for the data to be used in the collection.
     * @param {(String|Array)} data Data to be added
     */
    set setData(data) {

        /**
         * The data that has been set for the Collection.
         * @type {Array}
         */
        this.data = [];

        if(Array.isArray(data)) {
            this.data = data;
        } else {
            this.data.push(data);
        }

        this.data = this.FingerPrint.addPrints(this.data);
    }

    /**
     * Get all the data or processed data.
     * @returns {Array} The data in the Collection
     */
    all() {
        return this._data;
    }

    /**
     * First item in the data or processed data.
     * @returns {Object} The first item in the Collection
     */
    first() {
        return this._data[0];
    }

    /**
     * Get the specified item from the data or processed data.
     * @param  {Number}     item Number of item to get
     * @return {Object|Null}     Null if no data found or object defined.
     */
    get(item) {
        if(typeof this._data[item] === 'undefined') {
            return null;
        }

        return this._data[item];
    }

    /**
     * Add an item to the list of data.
     * @param {(Object|String)} value Item to add
     * @returns {Object}              Returns self
     */
    addItem(value) {
        this.data.push(this.checkSchema(value));
        this.data = this.FingerPrint.addPrints(this.data);

        return this;
    }

    /**
     * Resets the processed data collection back to
     * its original state
     * @return {Object}             Return self
     */
    reset() {
        this.processed = this.data;

        return this;
    }
}

export default new Implements(Collection);
