import merge from 'webpack-merge';
import path from 'path';
import common from './webpack.common';

module.exports = merge(common, {
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'public','dist'),
   },
   devtool: 'inline-source-map',
   devServer: {
     contentBase: path.resolve(__dirname, 'public'),
     historyApiFallback: true
   }
 });
