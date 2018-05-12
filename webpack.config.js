const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'postmaker.js',
    library: 'postmaker',
    libraryTarget: 'umd'
  }
};
