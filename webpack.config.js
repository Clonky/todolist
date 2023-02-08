const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    DOMrender: './src/DOMrender.js',
    renderers: './src/renderers.js',
    pageCoordinator: './src/pageCoordinator.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  plugins: [
    new HTMLWebpackPlugin(),
  ],
  module: {
    rules: [
      {test: /\.css$/i, use: ['style-loader', 'css-loader']},
    ],
  },
};
