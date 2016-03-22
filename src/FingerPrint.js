class FingerPrint {
    constructor() {

    }

    /**
     * Hash generation based on Java numerical
     * hashCode().
     * http://jsperf.com/string-hashing-methods/4
     * @param  {String} string String of data to be hashed
     * @return {Number}        Hashed number
     */
    generate(string) {
        let hash = 0,
            schar = 0;

        if(string.length == 0) {
            return hash;
        }

        for(let i = 0; i < string.length; i++) {
            schar = string.charCodeAt(i);
            hash = ((hash<<5)-hash)+schar;
            hash = hash & hash; // Convert to 32bit integer
        }

        return Math.abs(hash);
    }

    /**
     * Creates a getter for the hashed values
     * meaning it cannot be overwrote and faked.
     * @param  {Array} array The array of data to be hashed
     * @return {Array}       The passed data with a getter attached
     */
    createGetter(array) {
        let string = JSON.stringify(array);

        array.__defineGetter__('__hash__', () => {
            return this.generate(string);
        });

        return array;
    }

    /**
     * Loops through the passed Array of data
     * and adds the getter to each item.
     * @param  {Array} data Full data to be hashed
     * @return {Array}      Full data with new hashes
     *
     */
    addPrints(data) {
        if(!Array.isArray(data)) {
            return this.createGetter(data);
        }

        for(let i = 0; i < data.length; i++) {
            data[i] = this.createGetter(data[i]);
        }

        return data;
    }
}

export default FingerPrint;
