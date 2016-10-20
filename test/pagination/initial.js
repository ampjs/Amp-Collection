var assert = require('assert'),
    chai = require('chai'),
    { Collection, PaginatedCollection } = require('../../collection.js');

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

var InitialCollection = new PaginatedCollection(CollectionData);

describe('PaginatedCollection Initial', function() {
    it('PaginatedCollection indirectly inherits Collection', function() {
        var isInstance = (PaginatedCollection.prototype instanceof Collection);

        chai.expect(isInstance).to.be.an('boolean');
        chai.expect(isInstance).to.equal(true);
    });

    it('PaginatedCollection can add data as Collection would.', function() {
        chai.expect(InitialCollection.all()).to.be.an('array');
        chai.expect(InitialCollection.all().length).to.equal(3);
    });
});
