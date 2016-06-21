var assert = require('assert'),
    chai = require('chai'),
    { AmpCollection } = require('../../amp-collection.js');

var InitialCollection = new AmpCollection();

describe('AmpCollection Initial', function() {
    it('data should be an empty array', function() {
        chai.expect(InitialCollection).to.be.an('object');
        chai.expect(InitialCollection.data.length).to.equal(0);
    });

    it('__isProcessed should be a false boolean', function() {
        chai.expect(InitialCollection._isProcessed).to.be.an('boolean');
        chai.expect(InitialCollection._isProcessed).to.equal(false);
    });

    it('processed should be an empty array', function() {
        chai.expect(InitialCollection.processed).to.be.an('array');
        chai.expect(InitialCollection.processed.length).to.equal(0);
    });
});
