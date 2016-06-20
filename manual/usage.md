# AmpCollection Usage
#### Creating a Collection
```js
let family = [{
	‘forename’: ‘Mary’,
	‘surname’: ‘Lamb’,
	‘age’: ’45’,
	‘email’: ‘mary.lamb@family.com’
}, {
	‘forename’: ‘Lucy’,
	‘surname’: ‘Lamb’,
	‘age’: ’43’,
	‘email’: ‘lucy.lamb@family.com’
}, {
	‘forename’: ’Steven’,
	‘surname’: ‘Lamb’,
	‘age’: ’12’,
	‘email’: ’steven.lamb@family.com’
}];

let FamilyCollection = new ReflectCollection(family);
```

### Adding an extra object
```js
FamilyCollection.addItem({
	‘forename’: ‘Joseph’,
	‘surname’: ‘Pearson’,
	‘age’: ’87’,
	‘email’: ‘joseph.pearson@family.com’
});
```


#### Where Statements
```js
FamilyCollection.where(‘forename’, ‘Lucy’).orWhere(‘surname’, ’Pearson’).all();
```

**Result**
```
[{
	‘forename’: ‘Mary’,
	‘surname’: ‘Lamb’,
	‘age’: ’45’,
	‘email’: ‘mary.lamb@family.com’
}, {
	‘forename’: ‘Joseph’,
	‘surname’: ‘Pearson’,
	‘age’: ’87’,
	‘email’: ‘joseph.pearson@family.com’
}]
```

#### Getting the first result
```js
FamilyCollection.where(‘surname’, ‘Lamb’).first();
```

**Result**
```
[{
	‘forename’: ‘Mary’,
	‘surname’: ‘Lamb’,
	‘age’: ’45’,
	‘email’: ‘mary.lamb@family.com’
}]
```

#### Checking if a key exists
```js
if(FamilyCollection.has(‘shoesize’)) {
	return FamilyCollection.all();
} else {
	return “FamilyCollection does not contain a shoesize.”;
}
```

**Result**
```
FamilyCollection does not contain a shoesize.
```

#### Check if processed data is empty
```js
FamilyCollection.where(‘forename’, ‘Annabel’);

if(FamilyCollection.isEmpty()) {
	return “No members found.”;
}
```

**Result**
```
No members found.
```

#### Excluding data
```js
FamilyCollection.except([‘email’, ‘age’]).all();
```

**Result**
```
[{
	‘forename’: ‘Mary’,
	‘surname’: ‘Lamb’
}, {
	‘forename’: ‘Lucy’,
	‘surname’: ‘Lamb’
}, {
	‘forename’: ’Steven’,
	‘surname’: ‘Lamb’
}, {
	‘forename’: ‘Joseph’,
	‘surname’: ‘Pearson’
}];
```

#### Set a schema
Setting a schema allows for checking that the required keys match the data given. Schema checks are run every time new data is added.

_Note: Keys set in the object but not in the schema are treated as optional._
```js
FamilyCollection.schema([‘forename’, ‘surname’, ‘age’, ‘email’]);
FamilyCollection.add({
	‘forename’: ‘Florance’,
	‘surname’: ‘Pearson’,
	‘age’: ’89’
})
```

**_Console_ Output**
```
Collection: key “email” missing from collection.
```

**Result**
```
{
	‘forename’: ‘Florance’,
	‘surname’: ‘Pearson’,
	‘age’: ’89’
}
```
