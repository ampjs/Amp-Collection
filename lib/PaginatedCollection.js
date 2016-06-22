'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AmpCollection2 = require('./AmpCollection.js');

var _AmpCollection3 = _interopRequireDefault(_AmpCollection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginatedCollection = function (_AmpCollection) {
    _inherits(PaginatedCollection, _AmpCollection);

    function PaginatedCollection(data, size) {
        _classCallCheck(this, PaginatedCollection);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PaginatedCollection).call(this, data));

        size = size || false;
        _this.pages = {};

        if (size) {
            _this.paginate(size);
        }
        return _this;
    }

    _createClass(PaginatedCollection, [{
        key: 'paginate',
        value: function paginate(size) {
            size = size || 5;
            var sets = [];
            var chunks = this.data.length / size;

            for (var i = 0, c = 0; i < chunks; i++, c += size) {
                sets[i] = this.data.slice(c, c + size);
            }

            this.pages = {
                current: 1,
                next: 2,
                previous: 1,
                last: sets.length,
                chunks: size
            };

            this._processed = sets;

            return this;
        }
    }, {
        key: '_getPage',
        value: function _getPage(page) {
            var pageReference = page - 1;
            var nextPage = page + 1;
            var previousPage = page - 1;

            if (page >= this.pages.last) {
                nextPage = this.pages.last;
            }

            if (page <= 1) {
                previousPage = 1;
            }

            this.pages.current = page;
            this.pages.next = nextPage;
            this.pages.previous = previousPage;

            this._processed = this._data[page - 1];
        }
    }, {
        key: 'page',
        value: function page(_page) {
            _page = _page || 1;
            this._getPage(_page);
            return this;
        }
    }, {
        key: 'next',
        value: function next() {
            this._getPage(this.pages.next);
            return this;
        }
    }, {
        key: 'previous',
        value: function previous() {
            this._getPage(this.pages.previous);
            return this;
        }
    }]);

    return PaginatedCollection;
}(_AmpCollection3.default);

exports.default = PaginatedCollection;