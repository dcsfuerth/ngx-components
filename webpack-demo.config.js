const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = (process.env.ENV = process.env.NODE_ENV = 'development');
// const ENV = (process.env.ENV = process.env.NODE_ENV = 'production');

module.exports = {
  entry: {
    polyfills: ['core-js/es6', 'core-js/es7/reflect', 'zone.js/dist/zone'],
    main: path.resolve(__dirname, 'demo', 'src', 'main.ts'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'tmp'),
    chunkFilename: '[id].chunk.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      './environment': path.resolve(__dirname, 'demo', 'src', 'environments', ENV + '.ts'),
    },
  },

  devtool: 'cheap-module-source-map',

  module: {
    exprContextCritical: false,

    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: '@angularclass/hmr-loader' },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: 'tsconfig.demo.json',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
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

    new webpack.DefinePlugin({
      ENV: JSON.stringify(ENV),
    }),
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: false,
    port: 3000,
  },
};
