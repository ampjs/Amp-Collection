var assert = require('assert'),
    chai = require('chai'),
    { AmpCollection, PaginatedCollection } = require('../../amp-collection.js');

var InitialCollection = new PaginatedCollection();

describe('PaginatedCollection Initial', function() {
    it('PaginatedCollection indirectly inherits AmpCollection', function() {
        var isInstance = (PaginatedCollection.prototype instanceof AmpCollection);

        chai.expect(isInstance).to.be.an('boolean');
        chai.expect(isInstance).to.equal(true);
    });
});
