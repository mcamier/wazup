const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/styles/main.scss'],
  output: {filename: 'main.js', path: path.resolve(__dirname, 'dist')},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ]
      }
    ],
  }
};