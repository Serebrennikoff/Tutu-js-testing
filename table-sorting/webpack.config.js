'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.join(__dirname, "app"),

	entry: {
		index: './entry'
	},
  output: {
    path: __dirname + "/dist",
    filename: "build.js"
  },

  watch: true,

  watchOptions: {
  	aggregateTimeout: 100
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js']
  },


  module: {
  	loaders: [{
  		test: /\.js$/,
  		loader: 'babel?presets[]=es2015'
  	}]
  }
};