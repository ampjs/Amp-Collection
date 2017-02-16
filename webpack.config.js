const BabiliPlugin = require("babili-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const pack = require('./package.json');

let libFile = 'collection.min.js'

module.exports = {
    entry: {
        './collection': './collection.min.js'
        // './test/tests': './test/tests.js'
    },
    output: {
        path: __dirname,
        filename: libFile,
        library: pack.name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: []
    },
    plugins: [
        new BabiliPlugin(),
        new UglifyJSPlugin({
            mangle: {
                except: ['Collection', 'PaginatedCollection']
            }
        })
    ]
};
