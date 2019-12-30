'use strict';

const mdx = require("@mdx-js/mdx")

module.exports = {
  async process(src) {
    return await mdx(src);
  },
};
