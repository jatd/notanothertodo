const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

console.log('test----', path.resolve(__dirname, 'dist'));

module.exports = {
  mode: 'development',
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html',
    }),
  ],

  devServer: {
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
