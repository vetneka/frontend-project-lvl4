// @ts-check

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'development';
const envPath = '.env';

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'lodash-es': 'lodash',
    },
  },
  entry: {
    main: './src/index.jsx',
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
    clean: true,
  },
  devServer: {
    compress: true,
    port: 8080,
    host: '0.0.0.0',
    publicPath: '/assets/',
    historyApiFallback: true,
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    ...((mode === 'production')
      ? [new webpack.EnvironmentPlugin(['ROLLBAR_TOKEN'])]
      : [new Dotenv({ path: envPath })]),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/inline',
      },
    ],
  },
};
