# AmpCollection Usage
## Creating a Collection
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

## Adding an extra object
```js
FamilyCollection.addItem({
	'forename': 'Joseph',
	'surname': 'Pearson',
	'age': '87',
	'email': 'joseph.pearson@family.com'
});
```


## Where Statements
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

### Where operators
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

## Getting the first result
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

## Using dot notation
```js
FamilyCollection.where('home.city', 'London').all()
```
*Indices can also be used for arrays*
```js
FamilyCollection.where('hobbies.1', 'Swimming').all()
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

## Checking if a key exists
```js
if(FamilyCollection.has('shoesize')) {
	return FamilyCollection.all();
} else {
	return “FamilyCollection does not contain a shoesize.”;
}
```

**Result**
```
FamilyCollection does not contain a shoesize.
```

## Check if processed data is empty
```js
FamilyCollection.where('forename', 'Annabel');

if(FamilyCollection.isEmpty()) {
	return “No members found.”;
}
```

**Result**
```
No members found.
```

## Excluding data
```js
FamilyCollection.except(['email', 'age', 'home']).all();
```

**Result**
```
[{
    'forename': 'Mary',
    'surname': 'Lamb',
    'hobbies': ['Music', 'Swimming']
}, {
    'forename': 'Lucy',
    'surname': 'Lamb',
    'hobbies': ['Boxing', 'Science']
}, {
    'forename': 'Steven',
    'surname': 'Lamb',
    'hobbies': ['Reading']
}, {
    'forename': 'Joseph',
    'surname': 'Pearson',
    'hobbies': []
}];
```

## Set a schema
Setting a schema allows for checking that the required keys match the data given. Schema checks are run every time new data is added.

_Note: Keys set in the object but not in the schema are treated as optional._
```js
FamilyCollection.schema(['forename', 'surname', 'age', 'email']);
FamilyCollection.add({
	'forename': 'Florance',
	'surname': 'Pearson',
	'age': '89'
})
```

**_Console_ Output**
```
Collection: key “email” missing from collection.
```

**Result**
```
{
	'forename': 'Florance',
	'surname': 'Pearson',
	'age': '89'
}
```

### Strict Schema
`.schema()` has a second argument that can be set to `true` or `false` *(default)* for setting strict mode. Strict mode will cause the script to stop and return no data structure does not match with that set in the schema and ignores the optional note above.
