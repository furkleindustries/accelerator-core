'use strict';

const babel = require('@babel/core');
const mdx = require("@mdx-js/mdx").sync;
const path = require('path');

module.exports = {
  process: (src, filename) => (
    babel.transformSync(mdx(src), {
      filename,
      presets: [ 'react-app' ],
      root: path.join(__dirname, '..', '..'),
    })
  ),
};
