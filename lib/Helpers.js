'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helpers = function () {
    function Helpers() {
        _classCallCheck(this, Helpers);
    }

    _createClass(Helpers, [{
        key: 'has',

        /**
         * Checks if Collection has a matching key.
         * @param  {String}  key Key to seek
         * @return {(Boolean|Object)} Returns false or self if match.
         */
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
    }]);

    return Helpers;
}();

exports.default = Helpers;