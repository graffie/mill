/**
 * mill - webpack.config.js
 *
 * Authors:
 *   rockdai <rockdai@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:4000',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, './src/app'),
    ],
    vendor: ["history", "qs", "react", "react-dom","react-router","whatwg-fetch"]
  },
  output: {
    filename: 'mill.min.js',
    path: path.join(__dirname, '.'),
    publicPath: 'http://localhost:4000/assets/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /(node_modules\/(?!qs)|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      },
    }]
  },
  plugins: [
    new webpack.IgnorePlugin(/themes/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      warning: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __DEVTOOLS__: true,
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
};
