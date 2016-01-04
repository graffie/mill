/*
 * mill - server.js
 * Copyright(c) 2015 xeodou <xeodou@gmail.com>
 * MIT Licensed
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, '.'),
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  hot: true,
  stats: {
    chunks: false,
    chunkModules: false
  }
}).listen(4000, 'localhost', function (err) {
  if (err) console.log(err)
  console.log('Listening at localhost:4000')
})

