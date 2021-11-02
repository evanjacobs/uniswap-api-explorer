const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: { "url": require.resolve("url/") },
  },
  module: {
    rules: [{
      test: /\.m?js/,
      resolve: {
        fullySpecified: false
      }
    }],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  experiments: {
    topLevelAwait: true
  },
};
