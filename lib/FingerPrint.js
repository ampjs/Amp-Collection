'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FingerPrint = function () {
    function FingerPrint() {
        _classCallCheck(this, FingerPrint);
    }

    _createClass(FingerPrint, [{
        key: 'generate',

        /**
         * Hash generation based on Java numerical
         * hashCode().
         * http://jsperf.com/string-hashing-methods/4
         * @param  {String} string String of data to be hashed
         * @return {Number}        Hashed number
         */
        value: function generate(string) {
            var hash = 0,
                schar = 0;

            if (string.length == 0) {
                return hash;
            }

            for (var i = 0; i < string.length; i++) {
                schar = string.charCodeAt(i);
                hash = (hash << 5) - hash + schar;
                hash = hash & hash; // Convert to 32bit integer
            }

            return Math.abs(hash);
        }

        /**
         * Creates a getter for the hashed values
         * meaning it cannot be overwrote and faked.
         * @param  {Array} array The array of data to be hashed
         * @return {Array}       The passed data with a getter attached
         */

    }, {
        key: 'createGetter',
        value: function createGetter(array) {
            var _this = this;

            var string = JSON.stringify(array);

            array.__defineGetter__('__FingerPrint__', function () {
                return _this.generate(string);
            });

            return array;
        }

        /**
         * Loops through the passed Array of data
         * and adds the getter to each item.
         * @param  {Array} data Full data to be hashed
         * @return {Array}      Full data with new hashes
         *
         */

    }, {
        key: 'addPrints',
        value: function addPrints(data) {
            if (!Array.isArray(data)) {
                return this.createGetter(data);
            }

            for (var i = 0; i < data.length; i++) {
                data[i] = this.createGetter(data[i]);
                data[i].FingerPrint = new FingerPrint();
            }

            return data;
        }
    }]);

    return FingerPrint;
}();

exports.default = FingerPrint;