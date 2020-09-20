/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const dotenvPlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify(dotenv.config().parsed),
});
const webpackShellPlugin = new WebpackShellPlugin({
  onBuildEnd: ['yarn dev:graphql'],
});
const { NODE_ENV } = process.env;
module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  watch: true,
  target: 'async-node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  externals: [nodeExternals()],
  plugins: [dotenvPlugin, webpackShellPlugin],
};
