var assert = require('assert'),
    chai = require('chai'),
    { AmpCollection, PaginatedCollection } = require('../../amp-collection.js');

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
    'forename': 'Joseph',
    'surname': 'Pearson',
    'age': 87,
    'email': 'joseph.pearson@family.com'
}];

var PaginatedCollection = new PaginatedCollection(CollectionData);

describe('PaginatedCollection page', function() {
    it('paginate() chunks the data into twos.', function() {
        PaginatedCollection.paginate(2);

        chai.expect(PaginatedCollection.all()).to.be.an('array');
        chai.expect(PaginatedCollection.all().length).to.equal(2);
    });

    it('Can get the second page.', function() {
        PaginatedCollection.paginate(2).page(2);

        chai.expect(PaginatedCollection.all()).to.be.an('array');
        chai.expect(PaginatedCollection.all().length).to.equal(2);
    });
});
