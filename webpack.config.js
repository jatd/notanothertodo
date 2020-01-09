const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const localIdentName = '[name]__[local]___[hash:base64:5]';

module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: {
    main: './src/index.tsx',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
    },
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    port: 8000,
  },
};
