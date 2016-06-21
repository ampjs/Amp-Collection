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
}];

var FamilyCollection = new AmpCollection(CollectionData);

describe('AmpCollection schema', function() {
    var schemaValues = FamilyCollection.schema(['forename', 'surname', 'age', 'email']);

    describe('schema() - Should return (this).', function() {
        it('this._schema should be an array', function() {
            chai.expect(schemaValues._schema).to.be.an('array');
            chai.expect(schemaValues._schema.length).to.equal(4);
        });

        it('this._schemaStrict should be false', function() {
            chai.expect(schemaValues._schemaStrict).to.be.an('boolean');
            chai.expect(schemaValues._schemaStrict).to.equal(false);
        });
    });

    describe('add() should throw console.log messages', function() {
        it('Should be missing key message', function() {
            var consoleValue,
                consoleMessage;

            (function(){
                var log = console.log;
                console.log = function (message) {
                    consoleValue = false;
                    consoleMessage = arguments[0] + " " + arguments[1];
                    log.apply(message, arguments);
                };
            })();

            schemaValues.addItem({
                'forename': 'Florance',
                'surname': 'Pearson',
                'age': 89
            });

            chai.expect(consoleValue).to.equal(false);
            chai.expect(consoleMessage).to.equal("Collection: key \"email\" missing from collection.");
        });
    });
});
