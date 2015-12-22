/*
 * mill - webpack.config.production.js
 * Copyright(c) 2015 xeodou <xeodou@gmail.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    filename: 'mill.min.js',
    path: path.join(__dirname, '.'),
    publicPath: './'
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__DEVTOOLS__': false
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};