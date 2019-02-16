import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  paths,
} from '../paths';

// Generates an `index.html` file with the <script> injected.
export function getHtmlWebpackPlugin(mode) {
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
