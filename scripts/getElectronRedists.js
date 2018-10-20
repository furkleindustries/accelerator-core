const {
  join,
} = require('path');
const {
  promisify,
} = require('util');

const fs = require('fs');
const decompress = require('decompress');
const download = require('electron-download');

const exists = promisify(fs.exists);

const appDir = join(__dirname, '..');
const electronDir = join(appDir, 'build-desktop');

const linuxDir = join(electronDir, 'linux');
const macOSDir = join(electronDir, 'macOS');
const windowsDir = join(electronDir, 'windows');

const skipMacOS =
  process.argv.indexOf('--force-mac-build-on-windows') === -1 &&
  process.platform === 'win32';
if (skipMacOS) {
  console.log('Due to issues in the way Windows handles symlinks in zip ' +
              'archives, it is not possible to make macOS electron ' +
              'packages. You may override this by passing the ' +
              '--force-mac-build-on-windows to the getElectronRedists script ' +
              'or the get-electron-redists npm task, but it will likely ' +
              'fail, and even if it does not, you should test to be ' +
              'absolutely sure it works.\n');
}

exists(electronDir).then((dirExists) => {  
  Promise.all([
    exists(linuxDir),
    /* Pretend the directory already exists if skipMacOS is true. */
    skipMacOS ? true : exists(macOSDir),
    exists(windowsDir),
    dirExists ? null : promisify(fs.mkdir)(electronDir),
  ]).then((data) => {
    const {
      promise: downloadPromise,
      descriptors,
    } = doDownload(data[0], data[1], data[2]);

    if (descriptors.length) {
      downloadPromise.then((zipPaths) => {
        console.log('Finished downloading redists.');
        unzip(zipPaths, descriptors).then(() => {
          console.log('All redists unzipped!');
        }, (err) => {
          console.error(err.toString());
          throw err;
        });
      }, (err) => {
        console.error(err.toString());
        throw err;
      });
    } else {
      console.log('Folders exist for all Electron redists. If they are ' +
                  'empty or broken, delete the folders.');
    }
  }, (err) => {
    console.error(err.toString());
    throw err;
  });
}, (err) => {
  console.error(err.toString());
  throw err;
});

function doDownload(foundLinux, foundMac, foundWin) {
  const promises = [];
  const descriptors = [];

  if (!foundLinux) {
    console.log('Downloading electron redist for Linux.');

    descriptors.push('linux');

    promises.push(new Promise((resolve, reject) => {
      download({
        version: '3.0.4',
        arch: 'x64',
        platform: 'linux',
        cache: join(appDir, '.zips'),
      }, (err, zipPath) => {
        if (err) {
          reject(err);
        } else {
          fs.mkdir(linuxDir, (err) => {
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

  if (!foundMac) {
    console.log('Downloading electron redist for MacOS.');

    descriptors.push('macOS');

    promises.push(new Promise((resolve, reject) => {
      download({
        version: '3.0.4',
        arch: 'x64',
        platform: 'darwin',
        cache: join(appDir, '.zips'),
      }, (err, zipPath) => {
        if (err) {
          reject(err);
        } else {
          fs.mkdir(macOSDir, (err) => {
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

  if (!foundWin) {
    console.log('Downloading electron redist for Windows.');

    descriptors.push('windows');

    promises.push(new Promise((resolve, reject) => {
      download({
        version: '3.0.4',
        arch: 'x64',
        platform: 'win32',
        cache: join(appDir, '.zips'),
      }, (err, zipPath) => {
        if (err) {
          reject(err);
        } else {
          fs.mkdir(windowsDir, (err) => {
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
    promise: descriptors.length ? Promise.all(promises) : Promise.resolve(),
    descriptors,
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

    console.log(`Unzipping from ${zipPaths[index]} to ${outPath}`);
    zipPromises.push(decompress(zipPaths[index], outPath));
  });

  return Promise.all(zipPromises)
}
