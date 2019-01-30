const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../paths');

// Generates an `index.html` file with the <script> injected.
module.exports = function getHtmlWebpackPlugin(mode) {
  const base = {
    inject: true,
    template: paths.appHtml,
  };

  const opts = mode === 'development' ? base : {
    ...base,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  };

  return new HtmlWebpackPlugin(opts);
};