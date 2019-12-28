import * as crypto from 'crypto';
import {
  writeFile,
} from 'fs-extra';
import {
  getOptions,
} from 'loader-utils';
import * as path from 'path';
import validateOptions from 'schema-utils';
import {
  splitInkSourceIntoInkAndMdx,
} from '../../src/functions/splitInkSourceIntoInkAndMdx';
import uuid from 'tiny-uuid';

const schema = {
  type: 'object',
  properties: {},
};

export default async function InkMdxAliasWebpackLoader(content, map, meta) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, 'Ink-MDX Webpack Loader');

  const callback = this.async();

  const ids = {};
  const processText = ({ text, type, }) => {
    if (type === 'mdx') {
      const id = uuid();
      ids[id] = text;
      return `# @mdx ___BESbswy___${id}___ywsbSEB___\n`;
    }

    return text;
  };

  const vals = splitInkSourceIntoInkAndMdx(content).map(processText);
  const finalContent = vals.join('');

  const fileId = crypto.createHash('sha256')
    .update(this.resourcePath)
    .digest('hex');

  const aliasMapStr = `export default ${JSON.stringify(ids)}`;
  await writeFile(path.join(__dirname, '.cache', fileId), aliasMapStr);

  return callback(null, finalContent, map, meta);
}
