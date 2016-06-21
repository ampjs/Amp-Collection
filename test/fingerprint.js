var assert = require('assert'),
    chai = require('chai'),
    { AmpCollection } = require('../amp-collection.js');

var CollectionData = [{
    'forename': 'Mary',
    'surname': 'Lamb',
    'age': 45,
    'email': 'mary.lamb@family.com'
}, {
    'forename': 'Lucy',
    'surname': 'Lamb',
    'age': 43,
    'email': 'lucy.lamb@family.com'
}, {
    'forename': 'Steven',
    'surname': 'Lamb',
    'age': 12,
    'email': 'steven.lamb@family.com'
}, { // Duplicate for finger print testing purposes
    'forename': 'Steven',
    'surname': 'Lamb',
    'age': 12,
    'email': 'steven.lamb@family.com'
}];

var FamilyCollection = new AmpCollection(CollectionData);

describe('AmpCollection FingerPrint hashing', function() {
    describe('hash()', function() {
        it('Hashes cannot be overwritten', function() {
            // Try to overwrite.
            FamilyCollection.data[0].__FingerPrint__ = 'test';

            chai.expect(FamilyCollection.data[0].__FingerPrint__).to.not.equal('test');
        });

        it('__FingerPrint__ should should be a hashed value', function() {
            chai.expect(FamilyCollection.data[0].__FingerPrint__).to.be.an('number');
            chai.expect(FamilyCollection.data[0].__FingerPrint__).to.be.above(0);
            chai.expect(FamilyCollection.data[1].__FingerPrint__).to.be.an('number');
            chai.expect(FamilyCollection.data[1].__FingerPrint__).to.be.above(0);
            chai.expect(FamilyCollection.data[2].__FingerPrint__).to.be.an('number');
            chai.expect(FamilyCollection.data[2].__FingerPrint__).to.be.above(0);
        })
    });
});
