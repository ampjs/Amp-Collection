Collection: key "email" missing from collection.
# TOC
   - [AmpCollection create data](#ampcollection-create-data)
     - [Example data](#ampcollection-create-data-example-data)
     - [addItem()](#ampcollection-create-data-additem)
   - [AmpCollection Extra Queries](#ampcollection-extra-queries)
     - [except()](#ampcollection-extra-queries-except)
     - [unqiue()](#ampcollection-extra-queries-unqiue)
   - [AmpCollection FingerPrint hashing](#ampcollection-fingerprint-hashing)
     - [hash()](#ampcollection-fingerprint-hashing-hash)
   - [AmpCollection Helpers](#ampcollection-helpers)
   - [AmpCollection Initial](#ampcollection-initial)
   - [AmpCollection schema](#ampcollection-schema)
     - [schema() - Should return (this).](#ampcollection-schema-schema---should-return-this)
     - [add() should throw console.log messages](#ampcollection-schema-add-should-throw-consolelog-messages)
   - [AmpCollection where.](#ampcollection-where)
     - [where() and orWhere()](#ampcollection-where-where-and-orwhere)
     - [where() operators](#ampcollection-where-where-operators)
<a name=""></a>
 
<a name="ampcollection-create-data"></a>
# AmpCollection create data
<a name="ampcollection-create-data-example-data"></a>
## Example data
all() - Should get all three FamilyCollection values.

```js
chai.expect(FamilyCollection.all()).to.be.an('array');
chai.expect(FamilyCollection.all().length).to.equal(3);
```

<a name="ampcollection-create-data-additem"></a>
## addItem()
Should have an additional item.

```js
var Item = FamilyCollection.addItem({
    'forename': 'Joseph',
    'surname': 'Pearson',
    'age': 87,
    'email': 'joseph.pearson@family.com'
});
chai.expect(Item).to.be.an('object');
chai.expect(FamilyCollection.all()).to.be.an('array');
chai.expect(FamilyCollection.all().length).to.equal(4);
```

<a name="ampcollection-extra-queries"></a>
# AmpCollection Extra Queries
<a name="ampcollection-extra-queries-except"></a>
## except()
"age" of each item should be undefined.

```js
var exceptAge = FamilyCollection.except(['age']).all();
for(var i in exceptAge) {
    chai.expect(exceptAge[i].age).to.be.undefined;
}
```

<a name="ampcollection-extra-queries-unqiue"></a>
## unqiue()
Only return unique items.

```js
var uniques = FamilyCollection.unique().all();
chai.expect(uniques).to.be.an('array');
chai.expect(uniques.length).to.equal(2);
```

Only return unique items matching the 'age' key.

```js
var uniques = FamilyCollection.unique('age').all();
chai.expect(uniques).to.be.an('array');
chai.expect(uniques.length).to.equal(2);
```

<a name="ampcollection-fingerprint-hashing"></a>
# AmpCollection FingerPrint hashing
<a name="ampcollection-fingerprint-hashing-hash"></a>
## hash()
Hashes cannot be overwritten.

```js
// Try to overwrite.
FamilyCollection.data[0].__FingerPrint__ = 'test';
chai.expect(FamilyCollection.data[0].__FingerPrint__).to.not.equal('test');
```

__FinterPrint__ should should be a hashed value.

```js
chai.expect(FamilyCollection.data[0].__FingerPrint__).to.be.an('number');
chai.expect(FamilyCollection.data[0].__FingerPrint__).to.be.above(0);
chai.expect(FamilyCollection.data[1].__FingerPrint__).to.be.an('number');
chai.expect(FamilyCollection.data[1].__FingerPrint__).to.be.above(0);
chai.expect(FamilyCollection.data[2].__FingerPrint__).to.be.an('number');
chai.expect(FamilyCollection.data[2].__FingerPrint__).to.be.above(0);
```

<a name="ampcollection-helpers"></a>
# AmpCollection Helpers
has() - Should not have a key of "shoesize" and return false..

```js
var keyExists = FamilyCollection.has('showsize');
chai.expect(keyExists).to.be.an('boolean');
chai.expect(keyExists).to.equal(false);
```

isEmpty() - Should return true..

```js
var isEmpty = FamilyCollection.where('forename', 'Annabel');
chai.expect(isEmpty.isEmpty()).to.be.an('boolean');
chai.expect(isEmpty.isEmpty()).to.equal(true);
```

<a name="ampcollection-initial"></a>
# AmpCollection Initial
data should be an empty array.

```js
chai.expect(InitialCollection).to.be.an('object');
chai.expect(InitialCollection.data.length).to.equal(0);
```

__isProcessed should be a false boolean.

```js
chai.expect(InitialCollection._isProcessed).to.be.an('boolean');
chai.expect(InitialCollection._isProcessed).to.equal(false);
```

processed should be an empty array.

```js
chai.expect(InitialCollection.processed).to.be.an('array');
chai.expect(InitialCollection.processed.length).to.equal(0);
```

<a name="ampcollection-schema"></a>
# AmpCollection schema
<a name="ampcollection-schema-schema---should-return-this"></a>
## schema() - Should return (this).
this._schema should be an array.

```js
chai.expect(schemaValues._schema).to.be.an('array');
chai.expect(schemaValues._schema.length).to.equal(4);
```

this._schemaStrict should be false.

```js
chai.expect(schemaValues._schemaStrict).to.be.an('boolean');
chai.expect(schemaValues._schemaStrict).to.equal(false);
```

<a name="ampcollection-schema-add-should-throw-consolelog-messages"></a>
## add() should throw console.log messages
Should be missing key message.

```js
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
```

<a name="ampcollection-where"></a>
# AmpCollection where.
<a name="ampcollection-where-where-and-orwhere"></a>
## where() and orWhere()
Where forename is equal to Lucy.

```js
var Where = FamilyCollection.where('forename', 'Lucy').all();
chai.expect(Where).to.be.an('array');
chai.expect(Where.length).to.equal(1);
```

Where forename is equal to Lucy or surname equal to Pearson.

```js
var orWhere = FamilyCollection.where('forename', 'Lucy').orWhere('surname', 'Pearson').all();
chai.expect(orWhere).to.be.an('array');
chai.expect(orWhere.length).to.equal(2);
```

<a name="ampcollection-where-where-operators"></a>
## where() operators
(=) Where forename is equal to Lucy.

```js
var Equal = FamilyCollection.where('forename', '=', 'Lucy').all();
chai.expect(Equal).to.be.an('array');
chai.expect(Equal.length).to.equal(1);
```

(>) Where age is greater than 45.

```js
var greaterThan = FamilyCollection.where('age', '>', 45).all();
chai.expect(greaterThan).to.be.an('array');
chai.expect(greaterThan.length).to.equal(1);
```

(>=) Where age is greater than or equal to 45.

```js
var greaterThan = FamilyCollection.where('age', '>=', 45).all();
chai.expect(greaterThan).to.be.an('array');
chai.expect(greaterThan.length).to.equal(2);
```

(<) Where age is less than 45.

```js
var lessThan = FamilyCollection.where('age', '<', 45).all();
chai.expect(lessThan).to.be.an('array');
chai.expect(lessThan.length).to.equal(2);
```

(<=) Where age is less than or equal to 45.

```js
var lessThan = FamilyCollection.where('age', '<=', 45).all();
chai.expect(lessThan).to.be.an('array');
chai.expect(lessThan.length).to.equal(3);
```

1466524356000
