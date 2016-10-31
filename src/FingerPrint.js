/**
 * Allows the creation of FingerPrints on an Array
 * @class
 * @classdesc Allows the creation of FingerPrints on an Array
 */
class FingerPrint {

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

        if(string.length === 0) {
            return hash;
        }

        for(let i = 0; i < string.length; i++) {
            schar = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + schar;
            // Convert to 32bit integer
            hash &= hash;
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

        if(array.__FingerPrint__) {
            return array;
        }

        Object.defineProperty(array, '__FingerPrint__', {
            enumerable: false,
            get: () => {
                return this.generate(string);
            }
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
