import * as Enzyme from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');

import {
  pathExists,
} from 'fs-extra';
import {
  join,
} from 'path';

import {
  execSync,
} from 'child_process';

const appDir = join(__dirname, '..');

(async () => {
  if (!await pathExists(join(appDir, 'passages', 'passages-manifest.ts'))) {
    execSync('node scripts/generatePassagesManifest.js');
  }

  if (!await pathExists(join(appDir, 'headers', 'headers-manifest.ts'))) {
    execSync('node scripts/generateHeadersManifest.js');
  }

  if (!await pathExists(join(appDir, 'footers', 'footers-manifest.ts'))) {
    execSync('node scripts/generateFootersManifest.js');
  }

  if (!await pathExists(join(appDir, 'plugins', 'plugins-manifest.ts'))) {
    execSync('node scripts/generatePluginsManifest.js');
  }
})();

Enzyme.configure({ adapter: new Adapter() });
