const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  const isProduction = env === 'production'// returns boolean value
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public','dist'), //currently directory name + /public +/dist
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
          MiniCssExtractPlugin.loader,
          {
            loader:'css-loader',
            options:{
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map', //inline version will take longer to run build, but smaller. suitable for producion purpose
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true, //return index.html for 404 errors
      publicPath: '/dist/' //so the server knows where to retrieve the assets, as they are longer sitting in the public folder (public/dist)
    }
  };

}


