const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /.marko?$/,
      loader: 'marko-loader',
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.marko', '.css']
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  }
};