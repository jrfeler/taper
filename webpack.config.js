var config = {
  entry: './src/main.js', // entry point
  output: {
    filename: 'index.js', // place where bundled app will be served
     publicPath: '/',
  },
  devServer: {
    inline: true, // autorefresh
    historyApiFallback: true,
    port: 8080 // development port server
  },
  module: {
    rules: [{
        exclude: /node_modules/,
        test: /\.js/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules', './node_modules/grommet/node_modules']
            }
          }
        ]
      },
      {
        test: /\.jsx?$/, // search for js files
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'] // use es2015 and react
        }
      }
    ]
  }

}
module.exports = config;
