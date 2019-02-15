const chalk = require('chalk');
const {
  fontsToLoad,
} = require('../accelerator.config');
const {
  log,
  warn,
} = require('colorful-logging');
const {
  downloadFontFiles,
} = require('../src/fonts/downloadFontFiles');
const {
  downloadFontHelper,
} = require('../src/fonts/downloadFontHelper');
const fs = require('fs-extra');
const {
  getFontFaceRules,
} = require('../src/fonts/getFontFaceRules');
const path = require('path');

const errorHeader = 'The following error occurred when loading your fonts:';
const genericWarning =
  'Your fonts may not work as expected. Please correct the error and rebuild.';
const printWarning = (err) => {
  warn(errorHeader);
  warn(err.stack || err);
  warn(genericWarning);
  process.exit(0);
};

const downloadDirectory = path.join(__dirname, '..', 'public', 'fonts');

try {
  fs.removeSync(downloadDirectory);
} catch (err) {
  if (err.code !== 'EEXIST') {
    warn('Encountered an error removing the public/fonts/ directory.');
    printWarning(err);
    process.exit(0);
  }
}

try {
  fs.mkdirSync(downloadDirectory);
} catch (err) {
  warn('Encountered an error creating the public/fonts/ directory.');
  printWarning(err);
  process.exit(0);
}

const fontFaceRules = [];
let fontFiles;
Promise.all(fontsToLoad.map(downloadFontHelper)).then(
  async (fontHelpers) => {
    try {
      fontFiles = (await Promise.all(fontHelpers.map((fontHelper, index) => {
        fontFaceRules.push(getFontFaceRules(fontsToLoad[index], fontHelper));
        return downloadFontFiles(fontsToLoad[index], fontHelper, downloadDirectory);
      }))).reduce((oneDArr, twoDArr) =>  oneDArr.concat(twoDArr), []);
    } catch (err) {
      printWarning(err);
      process.exit(0);
    }

    const fontFacePath = path.join(downloadDirectory, 'fontface-autogen.css');
    try {
      await fs.writeFile(fontFacePath, fontFaceRules);
    } catch (err) {
      warn('Encountered an error while writing the @font-face file.');
      printWarning(err);
      process.exit(0);
    }

    log('Downloaded fonts successfully.');
    log('Fonts downloaded:\n  ' +
        `${fontFiles.map((name) => chalk.bold(name)).join(',\n  ')}.`);
  },
  (err) => printWarning(err),
);
