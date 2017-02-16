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
}, {
    'forename': 'Joseph',
    'surname': 'Pearson',
    'age': 87,
    'email': 'joseph.pearson@family.com'
}];

var PagedCollection = new PaginatedCollection(CollectionData, 1);

describe('PaginatedCollection pages', () => {
    describe('paginate()', () => {
        it('Set the PaginateCollection size into chunks of 1.', () => {
            chai.expect(PagedCollection.all()).to.be.an('array');
            chai.expect(PagedCollection.all().length).to.equal(4);
        });

        it('paginate() chunks the data into twos.', () => {
            let pages = PagedCollection.paginate(2).all();

            chai.expect(pages).to.be.an('array');
            chai.expect(pages.length).to.equal(2);
        });

        it('paginate() to have a default of 5.', () => {
            let pages = PagedCollection.paginate(0).all();

            chai.expect(pages).to.be.an('array');
            chai.expect(pages.length).to.equal(1);
        });

        it('paginate() accepts strings.', () => {
            let pages = PagedCollection.paginate('2').all();

            chai.expect(pages).to.be.an('array');
            chai.expect(pages.length).to.equal(2);
        });
    });

    describe('page()', () => {
        it('Can get the second page.', () => {
            let pages = PagedCollection.paginate(2).page(2).all();

            chai.expect(pages).to.be.an('array');
            chai.expect(pages.length).to.equal(2);
        });

        describe('{pages}', () => {
            it('{pages} object exists.', () => {
                PagedCollection.paginate(2);

                chai.expect(PagedCollection.pages).to.be.an('object');
                chai.expect(PagedCollection.pages.current).to.be.a('number');
                chai.expect(PagedCollection.pages.next).to.be.a('number');
                chai.expect(PagedCollection.pages.previous).to.be.a('number');
                chai.expect(PagedCollection.pages.last).to.be.a('number');
                chai.expect(PagedCollection.pages.chunks).to.be.a('number');
            });

            it('{pages} is set when getting second page of chunks of 1.', () => {
                // Split into chunks of 1 for testing next.
                PagedCollection.paginate(1).page(2);

                chai.expect(PagedCollection.pages.current).to.be.a('number');
                chai.expect(PagedCollection.pages.current).to.equal(2);
                chai.expect(PagedCollection.pages.next).to.be.a('number');
                chai.expect(PagedCollection.pages.next).to.equal(3);
                chai.expect(PagedCollection.pages.previous).to.be.a('number');
                chai.expect(PagedCollection.pages.previous).to.equal(1);
            });

            it('{pages.next} isn\'t greater than allowed.', () => {
                // Split into chunks of 1 for testing next.
                PagedCollection.paginate(1);

                chai.expect(PagedCollection.pages.next).to.be.a('number');
                chai.expect(PagedCollection.pages.next).to.not.equal(5);
            });

            it('{pages.next} isn\'t lower than allowed.', () => {
                // Split into chunks of 1 for testing next.
                PagedCollection.paginate(1).page(0);

                chai.expect(PagedCollection.pages.current).to.be.a('number');
                chai.expect(PagedCollection.pages.current).to.equal(1);
                chai.expect(PagedCollection.pages.next).to.be.a('number');
                chai.expect(PagedCollection.pages.next).to.equal(2);
                chai.expect(PagedCollection.pages.next).to.not.equal(0);
            });
        });
    });

    describe('next()', () => {
        it('{pages.next} is greater.', () => {
            var thePage = PagedCollection.paginate(1).page(2);

            chai.expect(thePage.pages.next).to.be.a('number');
            chai.expect(thePage.pages.next).to.equal(3);

            thePage.next();

            chai.expect(thePage.pages.next).to.be.a('number');
            chai.expect(thePage.pages.next).to.equal(4);
        });

        it('{pages.next} is doesn\'t exceed {pages.last}.', () => {
            var thePage = PagedCollection.paginate(1).page(4);

            chai.expect(thePage.pages.next).to.be.a('number');
            chai.expect(thePage.pages.next).to.equal(4);

            thePage.next();

            chai.expect(thePage.pages.next).to.not.equal(5);
        });
    });

    describe('previous()', () => {
        it('{pages.previous} is lower.', () => {
            var thePage = PagedCollection.paginate(1).page(3);

            chai.expect(thePage.pages.previous).to.be.a('number');
            chai.expect(thePage.pages.previous).to.equal(2);

            thePage.previous();

            chai.expect(thePage.pages.previous).to.be.a('number');
            chai.expect(thePage.pages.previous).to.equal(1);
        });

        it('{pages.previous} is doesn\'t go below 1.', () => {
            var thePage = PagedCollection.paginate(1).page(2);

            chai.expect(thePage.pages.previous).to.be.a('number');
            chai.expect(thePage.pages.previous).to.equal(1);

            thePage.previous();

            chai.expect(thePage.pages.previous).to.not.equal(0);
        });
    });
});
