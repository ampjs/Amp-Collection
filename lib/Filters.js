'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = function () {
    function Filters() {
        _classCallCheck(this, Filters);
    }

    _createClass(Filters, [{
        key: 'filter',


        /**
         * Iterate through each item and run through
         * a passed filter function/callback.
         * @param  {Function} filter Callback filter
         * @return {Object}          Returns self.
         */
        value: function filter(_filter) {
            for (var item = 0; item < this._data.length; item++) {
                this._data[item] = _filter(item, this.get(item));
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

    }, {
        key: 'unique',
        value: function unique(key) {
            var stored = [],
                uniqueKey = key || '__FingerPrint__';

            for (var item = 0; item < this.data.length; item++) {
                var value = this.data[item][uniqueKey];

                this.doWhere([], uniqueKey, '=', value);

                if (this.processed.length === 1) {
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
    }]);

    return Filters;
}();

exports.default = Filters;