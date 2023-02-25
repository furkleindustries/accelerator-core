import {
  configurationDefaults,
} from '../src/configuration/configurationDefaults';
import * as fs from 'fs-extra';
import {
  setUnhandledRejectionEvent,
} from './functions/setUnhandledRejectionEvent';
import * as path from 'path';

import config from '../accelerator.config';
import packageJson from '../package.json';

setUnhandledRejectionEvent();

const {
  storyMetadata: { title },
} = config;

const projectDir = path.join(__dirname, '..');
const appDir = path.join(projectDir, 'build-web');
const distDir = path.join(projectDir, 'build-desktop');
const publicDir = path.join(projectDir, 'public');

const windowsDir = path.join(distDir, 'windows', 'resources', 'app');
const macOSDir = path.join(distDir, 'macOS', 'Electron.app', 'Contents', 'Resources', 'app');
const linuxDir = path.join(distDir, 'linux', 'resources', 'app');

/* Written to main.js. Provides extremely simple defaults for the main thread
 * for Electron. */
const mainStr =
  `// In the main process.\n` +
  `const {\n` +
    `\tapp,\n` +
    `\tBrowserWindow,\n`+
  `} = require('electron');\n` +
  `let win;\n` +
  `app.on('ready', () => {\n` +
  `  win = new BrowserWindow();\n` +
  `  // Load a local HTML file.\n` +
  `  win.loadURL('file://${__dirname}/index.html');\n` +
  `  // ready-to-show; should prevent slow load i.e. issue in Safari.\n` +
  `  win.once('ready-to-show', () => {\n` +
  `    win.show();\n` +
  `  });\n` +
  `  // Emitted when the window is closed.\n` +
  `  win.on('closed', () => {\n` +
  `    // Dereference the window object, usually you would store windows\n` +
  `    // in an array if your app supports multi windows, this is the time\n` +
  `    // when you should delete the corresponding element.\n` +
  `    win = null;\n` +
  `  });\n` +
  `});\n` +
  `// Quit when all windows are closed.\n` +
  `app.on('window-all-closed', () => {\n` +
  `  // On macOS it is common for applications and their menu bar\n` +
  `  // to stay active until the user quits explicitly with Cmd + Q.\n` +
  `  if (process.platform !== 'darwin') {\n` +
  `    app.quit()\n` +
  `  }\n` +
  `});`;

const packageStr = JSON.stringify({
  name: title || configurationDefaults.storyMetadata.title,
  version: packageJson.version || '1.0.0',
  main: 'main.js',
}, null, 2);

const skipMacOS =
  process.argv.indexOf('--force-mac-build-on-windows') === -1 &&
  process.platform === 'win32';

if (skipMacOS) {
  console.warn('Due to issues in the way Windows handles symlinks in zip ' +
       'archives, it is not possible to make macOS electron ' +
       'packages. You may override this by passing the ' +
       '--force-mac-build-on-windows to the ' +
       'promoteContentToExecutables script or the ' +
       'promote-content-to-executables npm task, but it will likely ' +
       'fail, and even if it does not, you should test to be ' +
       'absolutely sure it works.\n');
}

(async function () {
  await Promise.all([
    fs.remove(windowsDir),
    skipMacOS ? null : fs.remove(macOSDir),
    fs.remove(linuxDir),
  ]);

  await Promise.all([
    fs.copy(appDir, windowsDir),
    fs.copy(publicDir, windowsDir),
    skipMacOS ? null : fs.copy(appDir, macOSDir),
    skipMacOS ? null : fs.copy(publicDir, macOSDir),
    fs.copy(appDir, linuxDir),
    fs.copy(publicDir, linuxDir),
  ]);

  await Promise.all([
    fs.outputFile(path.join(linuxDir, 'package.json'), packageStr),
    skipMacOS ? null : fs.outputFile(path.join(macOSDir, 'package.json'), packageStr),
    fs.outputFile(path.join(windowsDir, 'package.json'), packageStr),
    fs.outputFile(path.join(linuxDir, 'main.js'), mainStr),
    skipMacOS ? null : fs.outputFile(path.join(macOSDir, 'main.js'), mainStr),
    fs.outputFile(path.join(windowsDir, 'main.js'), mainStr),
  ]);

  console.log('Electron bundles are ready.');
})();
