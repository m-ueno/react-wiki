import path from 'path';
import webpack from 'webpack';

const js = {
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '',
    filename: 'bundle.js',
  },
  devServer: {
    // https://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option
    // https://github.com/callemall/material-ui-webpack-example/blob/4dba4758a56756921e2ec75b352c41d1325a6241/webpack-dev-server.config.js
    contentBase: './public',
    hot: true,
    inline: true,
    port: 3000,
    // If you are using the HTML5 history API you probably need to serve
    // your index.html in place of 404 responses,
    // which can be done by setting historyApiFallback: true
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: path.resolve('node_modules'),
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        loader: 'babel',
      },
      {
        test: /\.jsx$/,
        // include: path.resolve('src'),
        loaders: ['react-hot', 'babel'],
      },
    ],
  },
};

export default js;
