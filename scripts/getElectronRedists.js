import {
  log,
  warn,
} from 'colorful-logging';
import decompress from 'decompress';
import download from 'electron-download';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  setUnhandledRejectionEvent,
} from './functions/setUnhandledRejectionEvent';

setUnhandledRejectionEvent();

const appDir = path.join(__dirname, '..');
const electronDir = path.join(appDir, 'build-desktop');

const linuxDir = path.join(electronDir, 'linux');
const macOSDir = path.join(electronDir, 'macOS');
const windowsDir = path.join(electronDir, 'windows');

const skipMacOS =
  process.argv.indexOf('--force-mac-build-on-windows') === -1 &&
  process.platform === 'win32';

if (skipMacOS) {
  warn('Due to issues in the way Windows handles symlinks in zip ' +
       'archives, it is not possible to make macOS electron ' +
       'packages. You may override this by passing the ' +
       '--force-mac-build-on-windows to the getElectronRedists script ' +
       'or the get-electron-redists npm task, but it will likely ' +
       'fail, and even if it does not, you should test to be ' +
       'absolutely sure it works.\n');
}

(async () => {
  const electronDirExists = await fs.exists(electronDir);  
  const data = await Promise.all([
    fs.exists(linuxDir),
    /* Pretend the directory already exists if skipMacOS is true. */
    skipMacOS ? true : fs.exists(macOSDir),
    fs.exists(windowsDir),
    dirExists ? null : fs.mkdirp(electronDir),
  ]);

  const {
    promise: downloadPromise,
    descriptors,
  } = doDownload(data[0], data[1], data[2]);

  if (descriptors.length) {
    const zipPaths = await downloadPromise;
    log('Finished downloading redists.');
    await unzip(zipPaths, descriptors)
  } else {
    warn('Folders exist for all Electron redists. If they are ' +
         'empty or broken, delete the folders.');
  }
})();

function doDownload(foundLinux, foundMac, foundWin) {
  const promises = [];
  const descriptors = [];

  if (!foundLinux) {
    log('Downloading electron redist for Linux.');

    descriptors.push('linux');

    promises.push(new Promise((resolve, reject) => {
      download({
        version: '3.0.4',
        arch: 'x64',
        platform: 'linux',
        cache: path.join(appDir, '.zips'),
      }, (err, zipPath) => {
        if (err) {
          reject(err);
        } else {
          fs.mkdirp(linuxDir, (err) => {
            if (err && err.code !== 'EEXIST') {
              return reject(err);
            } else {
              resolve(zipPath);
            }
          });
        }
      });
    }));
  }

  if (!foundMac) {
    log('Downloading electron redist for MacOS.');

    descriptors.push('macOS');

    promises.push(new Promise((resolve, reject) => {
      download({
        version: '3.0.4',
        arch: 'x64',
        platform: 'darwin',
        cache: path.join(appDir, '.zips'),
      }, (err, zipPath) => {
        if (err) {
          reject(err);
        } else {
          fs.mkdirp(macOSDir, (err) => {
            if (err && err.code !== 'EEXIST') {
              return reject(err);
            } else {
              resolve(zipPath);
            }
          });
        }
      });
    }));
  }

  if (!foundWin) {
    log('Downloading electron redist for Windows.');

    descriptors.push('windows');

    promises.push(new Promise((resolve, reject) => {
      download({
        version: '3.0.4',
        arch: 'x64',
        platform: 'win32',
        cache: path.join(appDir, '.zips'),
      }, (err, zipPath) => {
        if (err) {
          return reject(err);
        } else {
          fs.mkdirp(windowsDir, (err) => {
            if (err && err.code !== 'EEXIST') {
              reject(err);
            } else {
              resolve(zipPath);
            }
          });
        }
      });
    }));
  }

  return {
    descriptors,
    promise: descriptors.length ? Promise.all(promises) : Promise.resolve(),
  };
}

function unzip(zipPaths, descriptors) {
  const zipPromises = [];
  descriptors.forEach((descriptor, index) => {
    let outPath;
    if (descriptor === 'linux') {
      outPath = linuxDir;
    } else if (descriptor === 'macOS') {
      outPath = macOSDir;
    } else if (descriptor === 'windows') {
      outPath = windowsDir;
    }

    log(`Unzipping from ${zipPaths[index]} to ${outPath}`);
    zipPromises.push(decompress(zipPaths[index], outPath));
  });

  return Promise.all(zipPromises)
}
