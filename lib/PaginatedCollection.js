'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection2 = require('./Collection.js');

var _Collection3 = _interopRequireDefault(_Collection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends on Collection and allows for pagination
 * of the data to be used.
 * @class
 * @classdesc Pagination class for Collection
 */
var PaginatedCollection = function (_Collection) {
    _inherits(PaginatedCollection, _Collection);

    /**
     * Construct the class
     * @param  {Array}      data        The given data to add to a collection.
     * @param  {Integer}    size=false  The amount of chunks to be used per-page.
     * @return {Object}                 Returns self
     */
    function PaginatedCollection(data, size) {
        _classCallCheck(this, PaginatedCollection);

        var _this = _possibleConstructorReturn(this, (PaginatedCollection.__proto__ || Object.getPrototypeOf(PaginatedCollection)).call(this, data));

        var chunks = size || false;

        /**
         * Holds information reguarding to
         * the position of the currently
         * viewed page.
         * @type {Object}
         */
        _this.pages = {};

        if (chunks) {
            _this.paginate(chunks);
        }
        return _this;
    }

    /**
     * Chunks the data based on the given size.
     * @param  {Integer} size=5 The amount of chunks to be used per-page.
     * @return {Object}         Returns self.
     */


    _createClass(PaginatedCollection, [{
        key: 'paginate',
        value: function paginate(size) {
            var chunks = size || 5,
                sets = [];

            chunks = this.data.length / chunks;

            for (var c = 0, i = 0; i < chunks; i += 1, c += size) {
                sets[i] = this.data.slice(c, c + size);
            }

            /**
             * Setup default page and positions.
             * @type {Object}
             */
            this.pages = {
                current: 1,
                next: 2,
                previous: 1,
                last: sets.length,
                chunks: size
            };

            /**
             * Sets the processed data to the
             * newly chunked array. _processed
             * is handled by Collection.
             * @type {Array}
             */
            this._processed = sets;

            return this;
        }

        /**
         * Gets the given page from the data object
         * and replaces _processed data with the newly
         * required Array. Given pages are based on a
         * #1 starting indices rather than #0.
         * _getPage will also update the page position
         * object with the necassary information.
         * @param  {Integer|Number} page The required page.
         * @return {Object}              Returns self.
         */

    }, {
        key: '_getPage',
        value: function _getPage(page) {
            var nextPage = page + 1,

            // pageReference = page - 1,
            previousPage = page - 1;

            if (page >= this.pages.last) {
                nextPage = this.pages.last;
            }

            if (page <= 1) {
                previousPage = 1;
            }

            this._setPages(page, nextPage, previousPage);

            this._processed = this._data[page - 1];
        }

        /**
         * Sets the page object.
         * @param {Integer|Number}  page            The current page
         * @param {Integer|Number}  nextPage        The next page
         * @param {Integer|Number}  previousPage    The previous page
         * @return {void}
         */

    }, {
        key: '_setPages',
        value: function _setPages(page, nextPage, previousPage) {
            this.pages.current = page;
            this.pages.next = nextPage;
            this.pages.previous = previousPage;
        }

        /**
         * Request a page by number.
         * @param  {Integer|Number} page=1 The required page.
         * @return {Object}                Returns self.
         */

    }, {
        key: 'page',
        value: function page(_page) {
            var getPage = _page || 1;

            this._getPage(getPage);

            return this;
        }

        /**
         * Get the next page from the currently
         * set position.
         * @return {Object} Returns self.
         */

    }, {
        key: 'next',
        value: function next() {
            this._getPage(this.pages.next);

            return this;
        }

        /**
         * Get the previous page from the currently
         * set position.
         * @return {Object} Returns self.
         */

    }, {
        key: 'previous',
        value: function previous() {
            this._getPage(this.pages.previous);

            return this;
        }
    }]);

    return PaginatedCollection;
}(_Collection3.default);

exports.default = PaginatedCollection;