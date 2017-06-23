const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    polyfills: ['core-js/es6', 'core-js/es7/reflect', 'zone.js/dist/zone'],
    vendor: [
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
    ],
    main: path.resolve(__dirname, 'demo', 'src', 'main.ts'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'tmp'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  devtool: 'cheap-eval-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFileName: 'tsconfig.demo.json',
            },
          },
          { loader: 'angular2-template-loader' },
        ],
      },

      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: ['./demo/src/index.html'],
      },

      {
        test: /\.css$/,
        loader: 'raw-loader',
      },

      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['polyfills', 'vendor'].reverse(),
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'demo', 'src', 'index.html'),
      chunksSortMode: 'dependency',
    }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve('./src'),
      {}
    ),
  ],

  devServer: {
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
};
