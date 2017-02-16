import chai from 'chai';
import { Collection, PaginatedCollection } from '../../collection.js';

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

describe('PaginatedCollection Initial', () => {
    it('PaginatedCollection indirectly inherits Collection', () => {
        var isInstance = (PaginatedCollection.prototype instanceof Collection);

        chai.expect(isInstance).to.be.an('boolean');
        chai.expect(isInstance).to.equal(true);
    });

    it('PaginatedCollection can add data as Collection would.', () => {
        chai.expect(InitialCollection.all()).to.be.an('array');
        chai.expect(InitialCollection.all().length).to.equal(3);
    });
});
