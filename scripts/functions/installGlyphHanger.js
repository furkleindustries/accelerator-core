import {
  exec,
} from 'child_process';
import {
  error,
  log,
} from 'colorful-logging';

export function installGlyphHanger() {
  return new Promise((resolve, reject) => {
    let GlyphHanger;
    try {
      GlyphHanger = require('glyphhanger');
    } catch (err) {
      if (err.code !== 'MODULE_NOT_FOUND') {
        reject(err);
      }
    }

    if (GlyphHanger) {
      return resolve();
    }

    const install = exec('npm install glyphhanger', null, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });

    install.stdout.on('data', log);
    install.stderr.on('data', error);
});
}