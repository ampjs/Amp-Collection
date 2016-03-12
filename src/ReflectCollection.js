class ReflectCollection {
    constructor(data) {
        this.setData = data || [];
        this.filtered = [];
    }

    set setData(data) {
        if(Array.isArray(data)) {
            this.data = data;
        } else {
            this.data = [];
            this.data.push(data);
        }
    }

    schema(keys, strict) {
        this.schema = keys.sort();
        this.schemaStrict = strict || false;
        return this;
    }

    checkSchema(data) {
        if(!Array.isArray(this.schema)) {
            return data;
        }

        if(this.schemaStrict) {
            var dataKeys = Object.keys(data).sort(),
                compare = (JSON.stringify(dataKeys) === JSON.stringify(this.schema));

            if(!compare) {
                console.log('Collection: Schema in strict mode -- keys do not match. Expecting: ', this.schema, 'given; ', dataKeys);
                window.stop();
                return;
            }
        }

        for(var i in this.schema) {
            var key = this.schema[i];

            if(data.hasOwnProperty(key)) {
                console.log('Collection: key "' + key + '" missing from collection.');
            }
        }

        return data;
    }

    all() {
        if(this.filtered.length > 0) {
            return this.filtered;
        }

        return this.data;
    }

    first() {
        if(this.filtered.length > 0) {
            return this.filtered[0];
        }

        return this.data[0];
    }

    get(i) {
        if(typeof this.data[i] === 'undefined') {
            return null;
        }

        if(this.filtered.length > 0) {
            return this.filtered[i];
        }

        return this.data[i];
    }

    add(data) {
        this.data.push(this.checkSchema(data));
        return this;
    }

    has(key) {
        for(var i in this.data) {
            if(typeof this.data[i][key] === 'undefined') {
                return false;
            }
        }

        return this;
    }

    isEmpty() {
        var values = this.data;

        if(this.filtered.length > 0) {
            values = this.filtered;
        }

        if(values.length > 0) {
            return false;
        }

        return true;
    }

    filter(filter) {
        for(var i in this.all()) {
            var data = filter(i, this.get(i));

            if(this.filtered.length > 0) {
                this.filtered[i] = data;
            } else {
                this.data[i] = data;
            }
        }
    }

    where(key, value) {
        return this.doWhere([], key, value);
    }

    orWhere(key, value) {
        return this.doWhere(this.filtered, key, value);
    }

    doWhere(filtered, key, value) {
        this.filtered = filtered;

        for(var i in this.data) {
            if(typeof this.data[i][key] !== 'undefined' && this.data[i][key] === value) {
                this.filtered.push(this.data[i]);
            }
        }

        return this;
    }
};

export default new ReflectCollection;
