import chai from 'chai';
import { Collection } from '../../collection.js';

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
}, { // Duplicate for finger print testing purposes
    'forename': 'Steven',
    'surname': 'Lamb',
    'age': 12,
    'email': 'steven.lamb@family.com'
}];

var FamilyCollection = new Collection(CollectionData);

describe('Collection FingerPrint hashing', () => {
    describe('hash()', () => {
        it('Hashes cannot be overwritten', () => {
            chai.expect(() => {
                // Try to overwrite.
                FamilyCollection.data[0].__FingerPrint__ = 'test';
            }).to.throw(TypeError);
        });

        it('Hashes are not enumerable', () => {
            chai.expect(FamilyCollection.data[0].propertyIsEnumerable('__FingerPrint__')).to.equal(false);
        });

        it('__FingerPrint__ should should be a hashed value', () => {
            chai.expect(FamilyCollection.data[0].__FingerPrint__).to.be.an('number');
            chai.expect(FamilyCollection.data[0].__FingerPrint__).to.be.above(0);
            chai.expect(FamilyCollection.data[0].__FingerPrint__).to.equal(362063917);

            chai.expect(FamilyCollection.data[1].__FingerPrint__).to.be.an('number');
            chai.expect(FamilyCollection.data[1].__FingerPrint__).to.be.above(0);
            chai.expect(FamilyCollection.data[1].__FingerPrint__).to.equal(2045079471);

            chai.expect(FamilyCollection.data[2].__FingerPrint__).to.be.an('number');
            chai.expect(FamilyCollection.data[2].__FingerPrint__).to.be.above(0);
            chai.expect(FamilyCollection.data[2].__FingerPrint__).to.equal(243978995);
        })
    });
});
