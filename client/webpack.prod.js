import webpack from 'webpack';
import merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import path from 'path';
import common from './webpack.common'

module.exports = merge(common, {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'dist'),
    publicPath: '/dist/'
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })

  ]
});
