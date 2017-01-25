var assert = require('assert'),
    chai = require('chai'),
    { Collection } = require('../../collection.js');

var CollectionData = [{
    'forename': 'Mary',
    'surname': 'Lamb',
    'age': 45,
    'email': 'mary.lamb@family.com',
    'home': {
        'city': 'London',
        'country': 'United Kingdom'
    },
    'hobbies': ['Music', 'Swimming']
}, {
    'forename': 'Lucy',
    'surname': 'Lamb',
    'age': 43,
    'email': 'lucy.lamb@family.com',
    'home': {
        'city': 'Middlesbrough',
        'country': 'United Kingdom'
    },
    'hobbies': ['Boxing', 'Science']
}, {
    'forename': 'Steven',
    'surname': 'Lamb',
    'age': 12,
    'email': 'steven.lamb@family.com',
    'home': {
        'city': 'London',
        'country': 'United Kingdom'
    },
    'hobbies': ['Reading']
}];

var FamilyCollection = new Collection(CollectionData);

describe('Collection Helpers', function() {
    it('has() - Should not have a key of "shoesize" and return false.', function() {
        var keyExists = FamilyCollection.has('showsize');

        chai.expect(keyExists).to.be.an('boolean');
        chai.expect(keyExists).to.equal(false);
    });

    it('has() - dot notation - Should have key of home.city.', function() {
        var keyExists = FamilyCollection.has('home.city');

        chai.expect(keyExists).to.be.an('boolean');
        chai.expect(keyExists).to.equal(true);
    });

    it('isEmpty() - Should return true.', function() {
        var isEmpty = FamilyCollection.where('forename', 'Annabel');
        chai.expect(isEmpty.isEmpty()).to.be.an('boolean');
        chai.expect(isEmpty.isEmpty()).to.equal(true);
    });
});
