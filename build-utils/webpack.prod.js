const Dotenv = require('dotenv-webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  // devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './.env.production',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: 'vendors.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.sass|\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true,
        },
      }
    }
  } 
};