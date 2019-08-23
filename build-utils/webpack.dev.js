const Dotenv = require('dotenv-webpack');
const postcssNormalize = require('postcss-normalize');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',

  plugins: [
    new Dotenv({
      path: './.env.development',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },

          'sass-loader'
        ]
      },
      {
        test: /\.sass|\.scss$/,
        use: [
          'style-loader',
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
};