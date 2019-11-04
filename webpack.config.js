const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production'// returns boolean value
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/

      }, {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map', //inline version will take longer to run build, but smaller. suitable for producion purpose
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true //return index.html for 404 errors
    }
  };

}


