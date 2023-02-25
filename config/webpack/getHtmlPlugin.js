import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  paths,
} from '../paths';

// Generates an `index.html` file with the <script> injected.
export const getHtmlPlugin = (mode) => {
  const base = {
    inject: true,
    scriptLoading: 'defer',
    template: paths.htmlTemplate,
  };

  const opts = mode === 'development' ?
    base :
    {
      ...base,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: false,
        useShortDoctype: true,
        removeEmptyAttributes: false,
        removeStyleLinkTypeAttributes: false,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: false,
        minifyURLs: false,
      },
    };

  return new HtmlWebpackPlugin(opts);
};
