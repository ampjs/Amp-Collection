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

    _createClass(ReflectCollection, [{
        key: 'schema',
        value: function schema(keys, strict) {
            this.schema = keys.sort();
            this.schemaStrict = strict || false;
            return this;
        }
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

                if (data.hasOwnProperty(key)) {
                    console.log('Collection: key "' + key + '" missing from collection.');
                }
            }

            return data;
        }
    }, {
        key: 'all',
        value: function all() {
            if (this.__isFiltered) {
                return this.filtered;
            }

            return this.data;
        }
    }, {
        key: 'first',
        value: function first() {
            if (this.__isFiltered) {
                return this.filtered[0];
            }

            return this.data[0];
        }
    }, {
        key: 'get',
        value: function get(i) {
            if (typeof this.data[i] === 'undefined') {
                return null;
            }

            if (this.__isFiltered) {
                return this.filtered[i];
            }

            return this.data[i];
        }
    }, {
        key: 'add',
        value: function add(data) {
            this.data.push(this.checkSchema(data));
            return this;
        }
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
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            var values = this.data;

            if (this.__isFiltered) {
                values = this.filtered;
            }

            if (values.length > 0) {
                return false;
            }

            return true;
        }
    }, {
        key: 'filter',
        value: function filter(_filter) {
            for (var i in this.all()) {
                var data = _filter(i, this.get(i));

                if (this.__isFiltered) {
                    this.filtered[i] = data;
                } else {
                    this.data[i] = data;
                }
            }
        }
    }, {
        key: 'where',
        value: function where(key, value) {
            return this.doWhere([], key, value);
        }
    }, {
        key: 'orWhere',
        value: function orWhere(key, value) {
            return this.doWhere(this.filtered, key, value);
        }
    }, {
        key: 'doWhere',
        value: function doWhere(filtered, key, value) {
            this.__isFiltered = true;
            this.filtered = filtered;

            for (var i in this.data) {
                if (typeof this.data[i][key] !== 'undefined' && this.data[i][key] === value) {
                    this.filtered.push(this.data[i]);
                }
            }

            return this;
        }
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