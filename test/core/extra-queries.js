var assert = require('assert'),
    chai = require('chai'),
    { Collection } = require('../../collection.js');

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
}, {
    'forename': 'Steven',
    'surname': 'Lamb',
    'age': 12,
    'email': 'steven.lamb@family.com'
}];

var FamilyCollection = new Collection(CollectionData);

describe('Collection Extra Queries', function() {
    describe('except()', function() {
        it('"age" of each item should be undefined', function() {
            var exceptAge = FamilyCollection.except(['age']).all();

            for(var i in exceptAge) {
                chai.expect(exceptAge[i].age).to.be.undefined;
            }
        });
    });

    describe('unique()', function() {
        it('Only return unique items', function() {
            var uniques = FamilyCollection.unique().all();

            chai.expect(uniques).to.be.an('array');
            chai.expect(uniques.length).to.equal(2);
        });

        it('Only return unique items matching the \'age\' key', function() {
            var uniques = FamilyCollection.unique('age').all();

            chai.expect(uniques).to.be.an('array');
            chai.expect(uniques.length).to.equal(2);
        });
    });
});
