# Amp Collection
A simple Javascript-based Collection class based on Laravel 5 Collections.

#### Install
```
npm i @ampersarnie/collection
```

## Basic Usage
#### Creating a Collection
```js
let family = [{
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
}, {
    'forename': 'Joseph',
    'surname': 'Pearson',
    'age': 87,
    'email': 'joseph.pearson@family.com',
    'home': {
        'city': 'London',
        'country': 'United Kingdom'
    },
    'hobbies': []
}];

let FamilyCollection = new AmpCollection(family);
```

#### Adding an extra object
```js
FamilyCollection.addItem({
	'forename': 'Joseph',
	'surname': 'Pearson',
	'age': '87',
	'email': 'joseph.pearson@family.com'
});
```


#### Where Statements
```js
FamilyCollection.where('forename', 'Lucy').orWhere('surname', 'Pearson').all();
```

**Result**
```
[{
	'forename': 'Lucy',
	'surname': 'Lamb',
	'age': '43',
	'email': 'lucy.lamb@family.com'
}, {
	'forename': 'Joseph',
	'surname': 'Pearson',
	'age': '87',
	'email': 'joseph.pearson@family.com'
}]
```

##### Where operators
The `.where()` method also supports typical operators, such as the following;
* `=` or `==` and `===`
* `>` and `>=`
* `<` and `<=`

*If an operator is not defined, `=` or `==` is assumed.*

```js
FamilyCollection.where('age', '>=', 45).all();
```

**Result**
```
[{
	'forename': 'Mary',
	'surname': 'Lamb',
	'age': '45',
	'email': 'mary.lamb@family.com'
}, {
	'forename': 'Joseph',
	'surname': 'Pearson',
	'age': '87',
	'email': 'joseph.pearson@family.com'
}]
```

#### Getting the first result
```js
FamilyCollection.where('surname', 'Lamb').first();
```

**Result**
```
[{
    'forename': 'Mary',
    'surname': 'Lamb',
    'age': 45,
    'email': 'mary.lamb@family.com',
    'home': {
        'city': 'London',
        'country': 'United Kingdom'
    },
    'hobbies': ['Music', 'Swimming']
}]
```

## Documentation
Usage documentation can be found in in the `manual` directory.

If you would like to create API documentation you can do so by installing esdoc and running with the `.esdoc` file to generate your own local copy.
```
npm install -g esdoc
esdoc -c config/.esdoc
```
