let { AmpCollection } = require('../amp-collection.js');

let CollectionData = [{
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

Amperf.describe('Small data set.', function() {
    Amperf.describe('Create', function(AmperfTest) {
        AmperfTest('Create collection and get all', function() {
            var Collection = new AmpCollection(CollectionData);
            Collection.all();
        });

        AmperfTest('Add an item', function() {
            var Collection = new AmpCollection(CollectionData);

            Collection.addItem({
                'forename': 'Joseph',
                'surname': 'Pearson',
                'age': 87,
                'email': 'joseph.pearson@family.com'
            });

            Collection.all();
        });
    });

    Amperf.describe('Where', function(AmperfTest) {
        AmperfTest('Where forename is equal to Lucy', function() {
            var Collection = new AmpCollection(CollectionData);
            Collection.where('forename', 'Lucy').all();
        });

        AmperfTest('Where forename is equal to Lucy or surname to equal Pearson', function() {
            var Collection = new AmpCollection(CollectionData);
            Collection.where('forename', 'Lucy').orWhere('surname', 'Pearson').all();
        });

        Amperf.describe('Where operators', function(AmperfTest) {
            AmperfTest('Where age is greater than 45', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.where('age', '>', 45).all();
            });

            AmperfTest('Where age is greater than or equal to 45', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.where('age', '>=', 45).all();
            });

            AmperfTest('Where age is less than to 45', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.where('age', '<', 45).all();
            });

            AmperfTest('Where age is less than or equal to 45', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.where('age', '<=', 45).all();
            });
        });
    });

    Amperf.describe('Extra Queries', function(AmperfTest) {
        Amperf.describe('unique()', function(AmperfTest) {
            AmperfTest('Get all Uniques', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.unique().all();
            });

            AmperfTest('Only uniques matching age key', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.unique('age').all();
            });
        });

        AmperfTest('Except', function() {
            var Collection = new AmpCollection(CollectionData);
            Collection.except(['age']).all();
        });
    });

    Amperf.describe('Helpers', function(AmperfTest) {
        Amperf.describe('has()', function(AmperfTest) {
            AmperfTest('Has is false', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.has('showsize');
            });

            AmperfTest('Has is true', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.has('age');
            });
        });

        Amperf.describe('isEmpty()', function(AmperfTest) {
            AmperfTest('isEmpty is true', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.where('forename', 'Annabel').isEmpty();
            });

            AmperfTest('isEmpty is false', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.where('forename', 'Mary').isEmpty();
            });
        });
    });

    Amperf.describe('Schema', function(AmperfTest) {
        Amperf.describe('schema()', function(AmperfTest) {
            AmperfTest('Set the schema', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.schema(['forename', 'surname', 'age', 'email']);
            });

            AmperfTest('addItem with mismatching schema', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.schema(['forename', 'surname', 'age', 'email']);

                Collection.addItem({
                    'forename': 'Florance',
                    'surname': 'Pearson',
                    'age': 89
                });
            });

            AmperfTest('addItem with mismatching schema in strict mode', function() {
                var Collection = new AmpCollection(CollectionData);
                Collection.schema(['forename', 'surname', 'age', 'email'], true);

                Collection.addItem({
                    'forename': 'Florance',
                    'surname': 'Pearson',
                    'age': 89
                });
            });
        });
    });
});
