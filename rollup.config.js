export default {
  entry: 'collection.js',
  dest: 'collection.min.js',
  format: 'umd',
  plugins: [],
  external: [
      '@ampersarnie/implements'
  ],
  globals: {
      '@ampersarnie/implements': '@ampersarnie/implements'
  }
};
