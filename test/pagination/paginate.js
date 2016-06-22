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

var PaginatedCollection = new PaginatedCollection(CollectionData, 1);

describe('PaginatedCollection page', function() {
    it('Set the PaginateCollection size into chunks of 1.', function() {
        chai.expect(PaginatedCollection.all()).to.be.an('array');
        chai.expect(PaginatedCollection.all().length).to.equal(4);
    });

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

    it('{pages} object exists.', function() {
        PaginatedCollection.paginate(2).page(2);

        chai.expect(PaginatedCollection.pages).to.be.an('object');
        chai.expect(PaginatedCollection.pages.current).to.be.a('number');
        chai.expect(PaginatedCollection.pages.next).to.be.a('number');
        chai.expect(PaginatedCollection.pages.previous).to.be.a('number');
    });
});
