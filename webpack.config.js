// See https://github.com/AngularClass/angular2-webpack-starter/

var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');

module.exports = {
  entry: "./src/tabris-bootstrap.js",
  output: {
    filename: "node_modules/tabris-ng.js",
    library: "tabris-ng",
    libraryTarget: "commonjs2"
  },
  plugins: [
    new OccurenceOrderPlugin(true),
    new UglifyJsPlugin({
      beautify: false,
      unused: true,
      deadCode: true,
      comments: false,
      compress : { screw_ie8 : true },
      mangle: { screw_ie8 : true }
    }),
  ],
  externals: [
    "tabris"
  ]
};
