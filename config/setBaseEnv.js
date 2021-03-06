import * as fs from 'fs-extra';
import * as path from 'path';
import {
  assert,
} from 'ts-assertions';

const {
  env: {
    BABEL_ENV,
    NODE_ENV,
    NODE_PATH,
  },
} = process;

if (!BABEL_ENV) {
  assert(
    NODE_ENV,
    'The NODE_ENV environment variable is required but was not set.',
  );

  process.env.BABEL_ENV = NODE_ENV;
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (NODE_PATH || '')
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);
