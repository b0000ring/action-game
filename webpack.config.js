const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "src/common"),
      "@engine": path.resolve(__dirname, "src/engine"),
      "@game": path.resolve(__dirname, "src/game"),
      "@app": path.resolve(__dirname, "src/app"),
    },
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/native/assets/js'),
  },
};