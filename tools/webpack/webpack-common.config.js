/* eslint-disable @typescript-eslint/no-var-requires */

// shared config (dev and prod)
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const env = require('dotenv').config().parsed;

module.exports = {
  // Add '.ts' and '.tsx' as resolvable extensions.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: path.join(process.cwd(), 'dist/fonts'),
        },
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/',
          publicPath: path.join(process.cwd(), 'dist/img'),
        },
      },
    ],
  },
  plugins: [
    // Simplifies creation of HTML files to serve webpack bundles.
    new HtmlWebpackPlugin({
      title: 'Miley',
      inject: true, // Inject all files generated by webpack
      template: './src/index.html',
    }),

    // All files inside webpack's output.path directory will be removed once, but the
    // directory itself will not be
    new CleanWebpackPlugin(),

    // The EnvironmentPlugin accepts either an array of keys or an object
    // mapping its keys to their default values.
    new webpack.EnvironmentPlugin(env),
  ],
  performance: {
    hints: false,
  },
};
