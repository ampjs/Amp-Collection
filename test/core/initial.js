import chai from 'chai';
import { Collection } from '../../collection.js';

let InitialCollection = new Collection();

describe('Collection Initial', () => {
    it('data should be an empty array', () => {
        chai.expect(InitialCollection).to.be.an('object');
        chai.expect(InitialCollection.data.length).to.equal(0);
    });

    it('_isProcessed should be a false boolean', () => {
        chai.expect(InitialCollection._isProcessed).to.be.an('boolean');
        chai.expect(InitialCollection._isProcessed).to.equal(false);
    });

    it('processed should be an empty array', () => {
        chai.expect(InitialCollection.processed).to.be.an('array');
        chai.expect(InitialCollection.processed.length).to.equal(0);
    });
});
