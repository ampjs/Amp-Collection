module.exports = function(Collection) {

    console.warn = function() {}

    Amperf.describe('Small data set.', function() {
        Amperf.describe('Create', function(AmperfTest) {
            AmperfTest('Create collection and get all', function() {

                this.all();
            }.bind(Collection));

            AmperfTest('Add an item', function() {


                this.addItem({
                    'forename': 'Joseph',
                    'surname': 'Pearson',
                    'age': 87,
                    'email': 'joseph.pearson@family.com'
                });

                this.all();
            }.bind(Collection));
        });

        Amperf.describe('Where', function(AmperfTest) {
            AmperfTest('Where forename is equal to Lucy', function() {

                this.where('forename', 'Lucy').all();
            }.bind(Collection));

            AmperfTest('Where forename is equal to Lucy or surname to equal Pearson', function() {

                this.where('forename', 'Lucy').orWhere('surname', 'Pearson').all();
            }.bind(Collection));

            Amperf.describe('Where operators', function(AmperfTest) {
                AmperfTest('Where age is greater than 45', function() {

                    this.where('age', '>', 45).all();
                }.bind(Collection));

                AmperfTest('Where age is greater than or equal to 45', function() {

                    this.where('age', '>=', 45).all();
                }.bind(Collection));

                AmperfTest('Where age is less than to 45', function() {

                    this.where('age', '<', 45).all();
                }.bind(Collection));

                AmperfTest('Where age is less than or equal to 45', function() {

                    this.where('age', '<=', 45).all();
                }.bind(Collection));
            });
        });

        Amperf.describe('Extra Queries', function(AmperfTest) {
            Amperf.describe('unique()', function(AmperfTest) {
                AmperfTest('Get all Uniques', function() {

                    this.unique().all();
                }.bind(Collection));

                AmperfTest('Only uniques matching age key', function() {

                    this.unique('age').all();
                }.bind(Collection));
            });

            AmperfTest('Except', function() {

                this.except(['age']).all();
            }.bind(Collection));
        });

        Amperf.describe('Helpers', function(AmperfTest) {
            Amperf.describe('has()', function(AmperfTest) {
                AmperfTest('Has is false', function() {

                    this.has('showsize');
                }.bind(Collection));

                AmperfTest('Has is true', function() {

                    this.has('age');
                }.bind(Collection));
            });

            Amperf.describe('isEmpty()', function(AmperfTest) {
                AmperfTest('isEmpty is true', function() {

                    this.where('forename', 'Annabel').isEmpty();
                }.bind(Collection));

                AmperfTest('isEmpty is false', function() {

                    this.where('forename', 'Mary').isEmpty();
                }.bind(Collection));
            });
        });

        Amperf.describe('Schema', function(AmperfTest) {
            Amperf.describe('schema()', function(AmperfTest) {
                AmperfTest('Set the schema', function() {

                    this.schema(['forename', 'surname', 'age', 'email']);
                }.bind(Collection));

                AmperfTest('addItem with mismatching schema', function() {

                    this.schema(['forename', 'surname', 'age', 'email']);

                    this.addItem({
                        'forename': 'Florance',
                        'surname': 'Pearson',
                        'age': 89
                    });
                }.bind(Collection));

                AmperfTest('addItem with mismatching schema in strict mode', function() {

                    this.schema(['forename', 'surname', 'age', 'email'], true);

                    try {
                        this.addItem({
                            'forename': 'Florance',
                            'surname': 'Pearson',
                            'age': 89
                        });
                    } catch(error) {
                        // Hidden.
                    }
                }.bind(Collection));
            });
        });
    });

}
