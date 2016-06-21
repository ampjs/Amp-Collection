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

describe('AmpCollection create data', function() {
    describe('Example data', function() {
        it('all() - Should get all three FamilyCollection values', function() {
            chai.expect(FamilyCollection.all()).to.be.an('array');
            chai.expect(FamilyCollection.all().length).to.equal(3);
        });
    });

    describe('addItem()', function() {
        it('Should have an additional item', function() {
            var Item = FamilyCollection.addItem({
                'forename': 'Joseph',
                'surname': 'Pearson',
                'age': 87,
                'email': 'joseph.pearson@family.com'
            });

            chai.expect(Item).to.be.an('object');
            chai.expect(FamilyCollection.all()).to.be.an('array');
            chai.expect(FamilyCollection.all().length).to.equal(4);
        });
    });
});
