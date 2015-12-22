/**!
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
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:4000',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, './src/app')
    ],
    vendors: ['react', 'react-router']
  },
  output: {
    filename: 'mill.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:4000/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      },
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEVTOOLS__': true
    }),
    new HtmlWebpackPlugin({
      title: 'Mill blog',
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html')
      // favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
    }),
    new CopyWebpackPlugin([{
      from: './config.js'
    }]),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
