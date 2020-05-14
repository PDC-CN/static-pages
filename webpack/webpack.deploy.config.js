var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
const packageJson = require('../package.json');
// var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var WebpackShellPlugin = require('webpack-shell-plugin');
var layout = require('./layout');

var routers = require('./routers.deploy.json').routers;

var entry = {
  ...layout.entry,
  style: './_common/style'
};
routers.forEach((r) => {
  entry[r.name] = r.entry;
});
var plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  chunks: ['style', r.name],
  inject: 'body',
  minify: false,
  templateParameters: {
    ...layout.templateParameters,
    ...r.templateParameters,
  },
}));

var config = {
  context: path.join(__dirname, '..', '/src'),
  entry,
  output: {
    path: path.join(__dirname, '..', '/dist/static'),
    filename: '[name].[chunkhash:8].js',
    publicPath: 'https://x-assets.coinvoice.cn/static/'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: process.env.NODE_ENV !== 'production', // judge if dev environment.
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[chunkhash:8].css",
    }),
    new WebpackShellPlugin({
      onBuildExit: [
        'echo',
        'echo ==============',
        'echo      WORK',
        'echo ==============',
        'echo',
        'node webpack/deploy.js',
      ]
    })
  ].concat(plugins),
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: "babel-loader"
    },
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
    },
    {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader', 'sass-loader']
    },
    {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      use: 'url-loader?limit=10000!img?progressive=true'
    },
    {
      test: /\.(eot|woff|woff2|ttf|svg|mp3|mp4|blob)$/,
      use: 'url-loader?limit=10000'
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  externals: {
    lodash: "_",
    jquery: "jQuery",
  },
};

module.exports = config;
