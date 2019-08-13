const Dotenv = require('dotenv-webpack');

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
        test: /\.sass|\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
};