import * as Enzyme from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');

import {
  pathExistsSync,
} from 'fs-extra';
import {
  join,
} from 'path';

const appDir = join(__dirname, '..');

if (!pathExistsSync(join(appDir, 'passages', 'passages-manifest.ts'))) {
  require('../scripts/generatePassagesManifest');
}

if (!pathExistsSync(join(appDir, 'headers', 'headers-manifest.ts'))) {
  require('../scripts/generateHeadersManifest');
}

if (!pathExistsSync(join(appDir, 'footers', 'footers-manifest.ts'))) {
  require('../scripts/generateFootersManifest');
}

if (!pathExistsSync(join(appDir, 'plugins', 'plugins-manifest.ts'))) {
  require('../scripts/generatePluginsManifest');
}

Enzyme.configure({ adapter: new Adapter(), });
