'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./webpack.dev')
const uglify = require('uglifyjs-webpack-plugin');
module.exports = merge(prodEnv, {
  plugins: [
  new uglify()
  ]
})