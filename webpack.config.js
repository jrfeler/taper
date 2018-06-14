var config = {
  entry: './index.js', // entry point
  output: {
    filename: './src/index.js', // place where bundled app will be served
    publicPath: '/'

  },
  devServer: {
    inline: true, // autorefresh
    historyApiFallback: true,
    port: 8080 // development port server
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [{
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2015']
        }
    }
  ]
}

}
module.exports = config;
