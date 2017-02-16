# TOC
   - [Collection Initial](#collection-initial)
   - [Collection create data](#collection-create-data)
     - [Example data](#collection-create-data-example-data)
     - [addItem()](#collection-create-data-additem)
     - [addItems()](#collection-create-data-additems)
   - [Collection where.](#collection-where)
     - [where() and orWhere()](#collection-where-where-and-orwhere)
     - [where() operators](#collection-where-where-operators)
   - [Collection Extra Queries](#collection-extra-queries)
     - [only()](#collection-extra-queries-only)
     - [except()](#collection-extra-queries-except)
     - [unique()](#collection-extra-queries-unique)
   - [Collection Helpers](#collection-helpers)
   - [Collection schema](#collection-schema)
     - [schema() - Should return (this).](#collection-schema-schema---should-return-this)
     - [add() should throw errors](#collection-schema-add-should-throw-errors)
   - [Collection FingerPrint hashing](#collection-fingerprint-hashing)
     - [hash()](#collection-fingerprint-hashing-hash)
   - [PaginatedCollection Initial](#paginatedcollection-initial)
   - [PaginatedCollection pages](#paginatedcollection-pages)
     - [paginate()](#paginatedcollection-pages-paginate)
     - [page()](#paginatedcollection-pages-page)
       - [{pages}](#paginatedcollection-pages-page-pages)
     - [next()](#paginatedcollection-pages-next)
     - [previous()](#paginatedcollection-pages-previous)
<a name=""></a>

<a name="collection-initial"></a>
# Collection Initial
data should be an empty array.

```js
_chai2.default.expect(InitialCollection).to.be.an('object');
_chai2.default.expect(InitialCollection.data.length).to.equal(0);
```

\_isProcessed should be a false boolean.

```js
_chai2.default.expect(InitialCollection._isProcessed).to.be.an('boolean');
_chai2.default.expect(InitialCollection._isProcessed).to.equal(false);
```

processed should be an empty array.

```js
_chai2.default.expect(InitialCollection.processed).to.be.an('array');
_chai2.default.expect(InitialCollection.processed.length).to.equal(0);
```

<a name="collection-create-data"></a>
# Collection create data
<a name="collection-create-data-example-data"></a>
## Example data
all() - Should get all three FamilyCollection values.

```js
_chai2.default.expect(FamilyCollection.all()).to.be.an('array');
_chai2.default.expect(FamilyCollection.all().length).to.equal(3);
```

<a name="collection-create-data-additem"></a>
## addItem()
Should have an additional item.

```js
var Item = FamilyCollection.addItem({
    'forename': 'Joseph',
    'surname': 'Pearson',
    'age': 87,
    'email': 'joseph.pearson@family.com'
});
_chai2.default.expect(Item).to.be.an('object');
_chai2.default.expect(FamilyCollection.all()).to.be.an('array');
_chai2.default.expect(FamilyCollection.all().length).to.equal(4);
```

Nested array should also be a collection.

```js
var Items = FamilyCollection.addItem({
    'forename': 'Joseph',
    'surname': 'Pearson',
    'age': 87,
    'email': 'joseph.pearson@family.com',
    'dislikes': ['cheese'],
    'likes': [{
        'name': 'Cars'
    }, {
        'name': 'Coffee'
    }]
});
_chai2.default.expect(Items.get(4).likes.get(1).name).to.equal('Coffee');
_chai2.default.expect(Items.get(2).likes.get(1).name).to.equal('Wine');
```

<a name="collection-create-data-additems"></a>
## addItems()
can add multiple items..

```js
var Item = FamilyCollection.addItem([{
    'forename': 'Joseph',
    'surname': 'Pearson',
    'age': 87,
    'email': 'joseph.pearson@family.com'
}, {
    'forename': 'Bob',
    'surname': 'Wilson',
    'age': 39,
    'email': 'robert.wilson@family.com'
}]);
_chai2.default.expect(Item).to.be.an('object');
_chai2.default.expect(FamilyCollection.all()).to.be.an('array');
_chai2.default.expect(FamilyCollection.all().length).to.equal(6);
```

<a name="collection-where"></a>
# Collection where.
<a name="collection-where-where-and-orwhere"></a>
## where() and orWhere()
Where forename is equal to Lucy.

```js
var Where = FamilyCollection.where('forename', 'Lucy').all();
_chai2.default.expect(Where).to.be.an('array');
_chai2.default.expect(Where.length).to.equal(1);
```

Where forename is equal to Lucy or surname equal to Pearson.

```js
var orWhere = FamilyCollection.where('forename', 'Lucy').orWhere('surname', 'Pearson').all();
_chai2.default.expect(orWhere).to.be.an('array');
_chai2.default.expect(orWhere.length).to.equal(2);
```

Where 'home.city' is equal to 'London'.

```js
var Equal = FamilyCollection.where('home.city', '=', 'Middlesbrough').all();
_chai2.default.expect(Equal).to.be.an('array');
_chai2.default.expect(Equal.length).to.equal(1);
```

Where 'hobbies.1' is equal to 'Science'.

```js
var Equal = FamilyCollection.where('hobbies.1', '=', 'Science').all();
_chai2.default.expect(Equal).to.be.an('array');
_chai2.default.expect(Equal.length).to.equal(1);
```

<a name="collection-where-where-operators"></a>
## where() operators
(=) Where forename is equal to Lucy.

```js
var Equal = FamilyCollection.where('forename', '=', 'Lucy').all();
_chai2.default.expect(Equal).to.be.an('array');
_chai2.default.expect(Equal.length).to.equal(1);
```

(>) Where age is greater than 45.

```js
var greaterThan = FamilyCollection.where('age', '>', 45).all();
_chai2.default.expect(greaterThan).to.be.an('array');
_chai2.default.expect(greaterThan.length).to.equal(1);
```

(>=) Where age is greater than or equal to 45.

```js
var greaterThan = FamilyCollection.where('age', '>=', 45).all();
_chai2.default.expect(greaterThan).to.be.an('array');
_chai2.default.expect(greaterThan.length).to.equal(2);
```

(<) Where age is less than 45.

```js
var lessThan = FamilyCollection.where('age', '<', 45).all();
_chai2.default.expect(lessThan).to.be.an('array');
_chai2.default.expect(lessThan.length).to.equal(2);
```

(<=) Where age is less than or equal to 45.

```js
var lessThan = FamilyCollection.where('age', '<=', 45).all();
_chai2.default.expect(lessThan).to.be.an('array');
_chai2.default.expect(lessThan.length).to.equal(3);
```

<a name="collection-extra-queries"></a>
# Collection Extra Queries
<a name="collection-extra-queries-only"></a>
## only()
"email" of each item should be undefined.

```js
var exceptEmail = FamilyCollection.only(['forename', 'surname', 'age']).all();
for (var i in exceptEmail) {
    _chai2.default.expect(exceptEmail[i].email).to.be.undefined;
}
```

<a name="collection-extra-queries-except"></a>
## except()
"age" of each item should be undefined.

```js
var exceptAge = FamilyCollection.except(['age']).all();
for (var i in exceptAge) {
    _chai2.default.expect(exceptAge[i].age).to.be.undefined;
}
```

<a name="collection-extra-queries-unique"></a>
## unique()
Only return unique items.

```js
var uniques = FamilyCollection.unique().all();
_chai2.default.expect(uniques).to.be.an('array');
_chai2.default.expect(uniques.length).to.equal(2);
```

Only return unique items matching the 'age' key.

```js
var uniques = FamilyCollection.unique('age').all();
_chai2.default.expect(uniques).to.be.an('array');
_chai2.default.expect(uniques.length).to.equal(2);
```

<a name="collection-helpers"></a>
# Collection Helpers
has() - Should not have a key of "shoesize" and return false..

```js
var keyExists = FamilyCollection.has('showsize');
_chai2.default.expect(keyExists).to.be.an('boolean');
_chai2.default.expect(keyExists).to.equal(false);
```

has() - dot notation - Should have key of home.city..

```js
var keyExists = FamilyCollection.has('home.city');
_chai2.default.expect(keyExists).to.be.an('boolean');
_chai2.default.expect(keyExists).to.equal(true);
```

isEmpty() - Should return true..

```js
var isEmpty = FamilyCollection.where('forename', 'Annabel');
_chai2.default.expect(isEmpty.isEmpty()).to.be.an('boolean');
_chai2.default.expect(isEmpty.isEmpty()).to.equal(true);
```

<a name="collection-schema"></a>
# Collection schema
<a name="collection-schema-schema---should-return-this"></a>
## schema() - Should return (this).
this.\_schema should be an array.

```js
_chai2.default.expect(schemaValues._schema).to.be.an('array');
_chai2.default.expect(schemaValues._schema.length).to.equal(4);
```

this.\_schemaStrict should be false.

```js
_chai2.default.expect(schemaValues._schemaStrict).to.be.an('boolean');
_chai2.default.expect(schemaValues._schemaStrict).to.equal(false);
```

<a name="collection-schema-add-should-throw-errors"></a>
## add() should throw errors
Should be missing key warning.

```js
var consoleValue, consoleMessage;
(function () {
    var log = console.warn;
    console.warn = function (message) {
        consoleValue = false;
        consoleMessage = arguments[0] + " " + arguments[1];
    };
})();
schemaValues.addItem({
    'forename': 'Florance',
    'surname': 'Pearson',
    'age': 89
});
_chai2.default.expect(consoleValue).to.equal(false);
_chai2.default.expect(consoleMessage).to.equal("Collection: key \"email\" missing from collection.");
```

Strict mode should throw an error..

```js
var schemaValues = FamilyCollection.schema(['forename', 'surname', 'age', 'email'], true);
var errorTest = function errorTest() {
    schemaValues.addItem({
        'forename': 'Florance',
        'surname': 'Pearson',
        'age': 89
    });
};
_chai2.default.expect(errorTest).to.throw(/Collection: Schema in strict mode -- keys do not match.Expecting: age,email,forename,surname - given; age,forename,surname/);
```

<a name="collection-fingerprint-hashing"></a>
# Collection FingerPrint hashing
<a name="collection-fingerprint-hashing-hash"></a>
## hash()
Hashes cannot be overwritten.

```js
_chai2.default.expect(function () {
    // Try to overwrite.
    FamilyCollection.data[0].__FingerPrint__ = 'test';
}).to.throw(TypeError);
```

Hashes are not enumerable.

```js
_chai2.default.expect(FamilyCollection.data[0].propertyIsEnumerable('__FingerPrint__')).to.equal(false);
```

\_\_FingerPrint__ should should be a hashed value.

```js
_chai2.default.expect(FamilyCollection.data[0].__FingerPrint__).to.be.an('number');
_chai2.default.expect(FamilyCollection.data[0].__FingerPrint__).to.be.above(0);
_chai2.default.expect(FamilyCollection.data[0].__FingerPrint__).to.equal(362063917);
_chai2.default.expect(FamilyCollection.data[1].__FingerPrint__).to.be.an('number');
_chai2.default.expect(FamilyCollection.data[1].__FingerPrint__).to.be.above(0);
_chai2.default.expect(FamilyCollection.data[1].__FingerPrint__).to.equal(2045079471);
_chai2.default.expect(FamilyCollection.data[2].__FingerPrint__).to.be.an('number');
_chai2.default.expect(FamilyCollection.data[2].__FingerPrint__).to.be.above(0);
_chai2.default.expect(FamilyCollection.data[2].__FingerPrint__).to.equal(243978995);
```

<a name="paginatedcollection-initial"></a>
# PaginatedCollection Initial
PaginatedCollection indirectly inherits Collection.

```js
var isInstance = _collection.PaginatedCollection.prototype instanceof _collection.Collection;
_chai2.default.expect(isInstance).to.be.an('boolean');
_chai2.default.expect(isInstance).to.equal(true);
```

PaginatedCollection can add data as Collection would..

```js
_chai2.default.expect(InitialCollection.all()).to.be.an('array');
_chai2.default.expect(InitialCollection.all().length).to.equal(3);
```

<a name="paginatedcollection-pages"></a>
# PaginatedCollection pages
<a name="paginatedcollection-pages-paginate"></a>
## paginate()
Set the PaginateCollection size into chunks of 1..

```js
_chai2.default.expect(PagedCollection.all()).to.be.an('array');
_chai2.default.expect(PagedCollection.all().length).to.equal(4);
```

paginate() chunks the data into twos..

```js
var pages = PagedCollection.paginate(2).all();
_chai2.default.expect(pages).to.be.an('array');
_chai2.default.expect(pages.length).to.equal(2);
```

paginate() to have a default of 5..

```js
var pages = PagedCollection.paginate(0).all();
_chai2.default.expect(pages).to.be.an('array');
_chai2.default.expect(pages.length).to.equal(1);
```

paginate() accepts strings..

```js
var pages = PagedCollection.paginate('2').all();
_chai2.default.expect(pages).to.be.an('array');
_chai2.default.expect(pages.length).to.equal(2);
```

<a name="paginatedcollection-pages-page"></a>
## page()
Can get the second page..

```js
var pages = PagedCollection.paginate(2).page(2).all();
_chai2.default.expect(pages).to.be.an('array');
_chai2.default.expect(pages.length).to.equal(2);
```

<a name="paginatedcollection-pages-page-pages"></a>
### {pages}
{pages} object exists..

```js
PagedCollection.paginate(2);
_chai2.default.expect(PagedCollection.pages).to.be.an('object');
_chai2.default.expect(PagedCollection.pages.current).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.next).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.previous).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.last).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.chunks).to.be.a('number');
```

{pages} is set when getting second page of chunks of 1..

```js
// Split into chunks of 1 for testing next.
PagedCollection.paginate(1).page(2);
_chai2.default.expect(PagedCollection.pages.current).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.current).to.equal(2);
_chai2.default.expect(PagedCollection.pages.next).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.next).to.equal(3);
_chai2.default.expect(PagedCollection.pages.previous).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.previous).to.equal(1);
```

{pages.next} isn't greater than allowed..

```js
// Split into chunks of 1 for testing next.
PagedCollection.paginate(1);
_chai2.default.expect(PagedCollection.pages.next).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.next).to.not.equal(5);
```

{pages.next} isn't lower than allowed..

```js
// Split into chunks of 1 for testing next.
PagedCollection.paginate(1).page(0);
_chai2.default.expect(PagedCollection.pages.current).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.current).to.equal(1);
_chai2.default.expect(PagedCollection.pages.next).to.be.a('number');
_chai2.default.expect(PagedCollection.pages.next).to.equal(2);
_chai2.default.expect(PagedCollection.pages.next).to.not.equal(0);
```

<a name="paginatedcollection-pages-next"></a>
## next()
{pages.next} is greater..

```js
var thePage = PagedCollection.paginate(1).page(2);
_chai2.default.expect(thePage.pages.next).to.be.a('number');
_chai2.default.expect(thePage.pages.next).to.equal(3);
thePage.next();
_chai2.default.expect(thePage.pages.next).to.be.a('number');
_chai2.default.expect(thePage.pages.next).to.equal(4);
```

{pages.next} is doesn't exceed {pages.last}..

```js
var thePage = PagedCollection.paginate(1).page(4);
_chai2.default.expect(thePage.pages.next).to.be.a('number');
_chai2.default.expect(thePage.pages.next).to.equal(4);
thePage.next();
_chai2.default.expect(thePage.pages.next).to.not.equal(5);
```

<a name="paginatedcollection-pages-previous"></a>
## previous()
{pages.previous} is lower..

```js
var thePage = PagedCollection.paginate(1).page(3);
_chai2.default.expect(thePage.pages.previous).to.be.a('number');
_chai2.default.expect(thePage.pages.previous).to.equal(2);
thePage.previous();
_chai2.default.expect(thePage.pages.previous).to.be.a('number');
_chai2.default.expect(thePage.pages.previous).to.equal(1);
```

{pages.previous} is doesn't go below 1..

```js
var thePage = PagedCollection.paginate(1).page(2);
_chai2.default.expect(thePage.pages.previous).to.be.a('number');
_chai2.default.expect(thePage.pages.previous).to.equal(1);
thePage.previous();
_chai2.default.expect(thePage.pages.previous).to.not.equal(0);
```

1487261552000
