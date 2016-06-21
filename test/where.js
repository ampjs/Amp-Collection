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
}, {
    'forename': 'Joseph',
    'surname': 'Pearson',
    'age': 87,
    'email': 'joseph.pearson@family.com'
}];

var FamilyCollection = new AmpCollection(CollectionData);

describe('AmpCollection where.', function() {
    describe('where() and orWhere()', function() {
        it('Where forename is equal to Lucy', function() {
            var Where = FamilyCollection.where('forename', 'Lucy').all();
            chai.expect(Where).to.be.an('array');
            chai.expect(Where.length).to.equal(1);
        });

        it('Where forename is equal to Lucy or surname equal to Pearson', function() {
            var orWhere = FamilyCollection.where('forename', 'Lucy').orWhere('surname', 'Pearson').all();
            chai.expect(orWhere).to.be.an('array');
            chai.expect(orWhere.length).to.equal(2);
        });
    });

    describe('where() operators', function() {
        it('(=) Where forename is equal to Lucy', function() {
            var Equal = FamilyCollection.where('forename', '=', 'Lucy').all();
            chai.expect(Equal).to.be.an('array');
            chai.expect(Equal.length).to.equal(1);
        });

        it('(>) Where age is greater than 45', function() {
            var greaterThan = FamilyCollection.where('age', '>', 45).all();
            chai.expect(greaterThan).to.be.an('array');
            chai.expect(greaterThan.length).to.equal(1);
        });

        it('(>=) Where age is greater than or equal to 45', function() {
            var greaterThan = FamilyCollection.where('age', '>=', 45).all();
            chai.expect(greaterThan).to.be.an('array');
            chai.expect(greaterThan.length).to.equal(2);
        });

        it('(<) Where age is less than 45', function() {
            var lessThan = FamilyCollection.where('age', '<', 45).all();
            chai.expect(lessThan).to.be.an('array');
            chai.expect(lessThan.length).to.equal(2);
        });

        it('(<=) Where age is less than or equal to 45', function() {
            var lessThan = FamilyCollection.where('age', '<=', 45).all();
            chai.expect(lessThan).to.be.an('array');
            chai.expect(lessThan.length).to.equal(3);
        });
    });
});
