const Dotenv = require('dotenv-webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssNormalize = require('postcss-normalize');

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
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
          },
          'sass-loader'
        ]
      },
      {
        test: /\.sass|\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[name]-[local]',
                // mode: 'local',
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),

                postcssNormalize(),
              ],
            },
          },
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