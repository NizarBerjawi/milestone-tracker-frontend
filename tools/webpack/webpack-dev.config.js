const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack-common.config.js');

module.exports = merge(commonConfig, {
  mode: 'development',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  // Here the application starts executing and webpack starts bundling
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:9000', // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    path.join(process.cwd(), 'src/index.tsx'),
  ],

  // Options related to how webpack emits results
  output: {
    // The target directory for all output files must be an absolute path
    // path: path.resolve(__dirname, 'public/dist'),
    // The filename template for entry chunks
    filename: '[name].js',
  },
  optimization: {
    // Tell webpack to minimize the bundle using the UglifyjsWebpackPlugin.
    minimize: false,
    // npm packages are added to the vendor code separately in splitChunks below
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          filename: 'js/[name].js',
          name: 'common',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    hot: true, // enable HMR on the server
    port: 9000
  },

  plugins: [
    // Expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'development',
    // }),

    // Allows modules to be updated at runtime without the need for a full refresh
    new webpack.HotModuleReplacementPlugin(),
    // Makes it easier to see which dependencies are being patched
    new webpack.NamedModulesPlugin(),
  ]
});
