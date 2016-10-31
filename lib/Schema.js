'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
    function Schema() {
        _classCallCheck(this, Schema);
    }

    _createClass(Schema, [{
        key: 'schema',


        /**
         * Create the schema for the current Collection.
         * @param {Array}   keys            A list of keys to match
         * @param {Bool}    strict=false    Sets strict mode
         * @returns {Object}                Returns self.
         */
        value: function schema(keys, strict) {

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

    }, {
        key: 'checkSchema',
        value: function checkSchema(data) {
            if (!Array.isArray(this._schema)) {
                return data;
            }

            if (this._schemaStrict) {
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

            if (JSON.stringify(dataKeys) !== JSON.stringify(this._schema)) {
                throw new Error('Collection: Schema in strict mode -- keys do not match.' + ('Expecting: ' + this._schema + ' - given; ' + dataKeys));
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
            for (var key = 0; key < this._schema.length; key++) {
                if (!data.hasOwnProperty(this._schema[key])) {
                    console.warn('Collection:', 'key "' + this._schema[key] + '" missing from collection.');
                }
            }

            return data;
        }
    }]);

    return Schema;
}();

exports.default = Schema;