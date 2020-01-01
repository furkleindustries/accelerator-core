/**
 * Unused at present.
 */

import {
  transformAsync,
} from '@babel/core';
import * as crypto from 'crypto';
import {
  getOptions,
} from 'loader-utils';
import mdx from '@mdx-js/mdx';
import * as path from 'path';
import validateOptions from 'schema-utils';

const schema = {
  type: 'object',
  properties: {},
};

const pragmaFixRe = /^(?:\/\*\s@jsx mdx\s\*\/\s*)?((?:.|\s)+)/;

export default async function InkMdxResolverWebpackLoader(content, map) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, 'Ink-MDX Webpack Loader');

  const callback = this.async();

  const fileId = crypto
    .createHash('sha256')
    .update(this.resourcePath)
    .digest('hex');

  const {
    default: declaration,
  } = await import(path.join(__dirname, '.cache', fileId));

  const aliases = {};
  await Promise.all(Object.keys(declaration).map((aliasId) => (
    new Promise(async (resolve, reject) => {
      try {
        const mdxed = (await mdx(
          declaration[aliasId],
          { filepath: this.resourcePath },
        )).match(pragmaFixRe)[1];

        const { code } = await transformAsync(
          mdxed,
          {
            filename: this.resourcePath,
            plugins: [ '@babel/plugin-transform-modules-commonjs' ],
            presets: [ 'react-app' ],
          },
        );

        aliases[aliasId] = code;
      } catch (err) {
        return reject(err);
      }

      return resolve();
    })
  )));

  const finalContent = content + (
    `\const React = require('react');\n` +
    `const mdxAliases = {${Object.keys(aliases).reduce((str, aliasId) => (
      `${str}"${aliasId}": (() => {\n  ${aliases[aliasId]}\n  return MDXContent;\n})(),\n`
    ), '')}};\n` +
    `module.exports.mdxAliases = mdxAliases;\n` +
    `const getMdxComponent = (id) => (props) => (\n` +
    `  React.createElement(mdxAliases[id], props)\n` +
    `);\n` +
    `module.exports.getMdxComponent = getMdxComponent;\n`
  );

  return callback(null, finalContent);
};
