/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dotenvPlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify(dotenv.config().parsed),
});

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3030,
    clientLogLevel: 'trace',
  },
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // this is important for react router dom. Without this tag /product/:id not working.
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'babel-plugin-styled-components',
                // 'react-refresh/babel',
              ],
            },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              errorsAsWarnings: true,
            },
          },
        ],
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      mode: 'development',
    }),
    dotenvPlugin,
  ],
};
