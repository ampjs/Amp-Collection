var assert = require('assert'),
    chai = require('chai'),
    AmpCollection = require('../amp-collection.js').default;

var InitialCollection = new AmpCollection();

var FamilyCollection = new AmpCollection([{
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
}]);

describe('AmpCollection Initial', function() {
    it('data should be an empty array', function() {
        chai.expect(InitialCollection).to.be.an('object');
        chai.expect(InitialCollection.data.length).to.equal(0);
    });

    it('__isProcessed should be a false boolean', function() {
        chai.expect(InitialCollection.__isProcessed).to.be.an('boolean');
        chai.expect(InitialCollection.__isProcessed).to.equal(false);
    });

    it('processed should be an empty array', function() {
        chai.expect(InitialCollection.processed).to.be.an('array');
        chai.expect(InitialCollection.processed.length).to.equal(0);
    });
});

describe('AmpCollection Example data', function() {
    describe('Example data', function() {
        it('all() - Should get all three FamilyCollection values', function() {
            chai.expect(FamilyCollection.all()).to.be.an('array');
            chai.expect(FamilyCollection.all().length).to.equal(4);
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
            chai.expect(FamilyCollection.all().length).to.equal(5);
        });
    });

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
                chai.expect(lessThan.length).to.equal(3);
            });

            it('(<=) Where age is less than or equal to 45', function() {
                var lessThan = FamilyCollection.where('age', '<=', 45).all();
                chai.expect(lessThan).to.be.an('array');
                chai.expect(lessThan.length).to.equal(4);
            });
        });

        describe('except()', function() {
            it('"age" of each item should be undefined', function() {
                var exceptAge = FamilyCollection.except(['age']).all();

                for(var i in exceptAge) {
                    chai.expect(exceptAge[i].age).to.be.undefined;
                }
            });
        });

        describe('unqiue()', function() {
            it('Only return unique items', function() {
                var uniques = FamilyCollection.unique().all();

                chai.expect(uniques).to.be.an('array');
                chai.expect(uniques.length).to.equal(3);
            });

            it('Only return unique items matching the \'age\' key', function() {
                var uniques = FamilyCollection.unique('age').all();

                chai.expect(uniques).to.be.an('array');
                chai.expect(uniques.length).to.equal(3);
            });
        });
    });

    describe('Helper methods', function() {
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

    describe('Schema', function() {
        var schemaValues = FamilyCollection.schema(['forename', 'surname', 'age', 'email']);

        describe('schema() - Should return (this).', function() {
            it('this.schema should be an array', function() {
                chai.expect(schemaValues.schema).to.be.an('array');
                chai.expect(schemaValues.schema.length).to.equal(4);
            });

            it('this.schemaStrict should be false', function() {
                chai.expect(schemaValues.schemaStrict).to.be.an('boolean');
                chai.expect(schemaValues.schemaStrict).to.equal(false);
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

    describe('Hash', function() {
        describe('hash()', function() {
            it('Should return a hashed value', function() {
                // Try to overwrite.
                FamilyCollection.data[0].__hash__ = 'test';

                chai.expect(FamilyCollection.data[0].__hash__).to.be.an('number');
                chai.expect(FamilyCollection.data[0].__hash__).to.be.above(0);
                chai.expect(FamilyCollection.data[1].__hash__).to.be.an('number');
                chai.expect(FamilyCollection.data[1].__hash__).to.be.above(0);
                chai.expect(FamilyCollection.data[2].__hash__).to.be.an('number');
                chai.expect(FamilyCollection.data[2].__hash__).to.be.above(0);
            })
        });
    });
});
