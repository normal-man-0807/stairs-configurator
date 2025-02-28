const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  entry: '/src/StairSimulation.ts',
  mode: 'production',
  output: {
    filename: 'stair_min.js',
    path: path.join(__dirname, '/examples/js'),
    library: {
      name: 'STAIR',
      type: 'umd',
    },
  },
  performance: {
    hints: false,
  },
  plugins: [],
});
