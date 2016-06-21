var assert = require('assert'),
    chai = require('chai'),
    { AmpCollection } = require('../../amp-collection.js');

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
}];

var FamilyCollection = new AmpCollection(CollectionData);

describe('AmpCollection Helpers', function() {
    it('has() - Should not have a key of "shoesize" and return false.', function() {
        var keyExists = FamilyCollection.has('showsize');

        chai.expect(keyExists).to.be.an('boolean');
        chai.expect(keyExists).to.equal(false);
    });

    it('isEmpty() - Should return true.', function() {
        var isEmpty = FamilyCollection.where('forename', 'Annabel');
        chai.expect(isEmpty.isEmpty()).to.be.an('boolean');
        chai.expect(isEmpty.isEmpty()).to.equal(true);
    });
});
