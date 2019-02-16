import chalk from 'chalk';
import {
  exec,
} from 'child_process';
import {
  error,
  log,
  warn,
} from 'colorful-logging';
import {
  downloadFontFiles,
} from '../src/fonts/downloadFontFiles';
import {
  downloadFontHelper,
} from '../src/fonts/downloadFontHelper';
import * as fs from 'fs-extra';
import {
  getFontFaceRules,
} from '../src/fonts/getFontFaceRules';
import {
  getNormalizedAcceleratorConfig,
} from '../src/configuration/getNormalizedAcceleratorConfig';
import * as path from 'path';
import {
  setUnhandledRejectionEvent,
} from './functions/setUnhandledRejectionEvent';

setUnhandledRejectionEvent();

const {
  fontsToLoad,
  subsetFont: {
    formats,
    fromFont,
    loadingStrategy,
    name: subsetName,
    subsetRange,
  },
} = getNormalizedAcceleratorConfig();

throw new Error('FINISH/FIX SUBSETTING IDIOT');

/* Don't do anything if the user doesn't indicate any fonts to load. */
if (!fontsToLoad) {
  warn(
    'No fontsToLoad property was present in accelerator.config.js, and no ' +
    'fonts will be loaded.'
  );

  process.exit(0);
}

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
(async () => {
  const fontHelpers = await Promise.all(fontsToLoad.map(downloadFontHelper));  
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

  log('Subsetting font.');

  let glyphhanger;
  try {
    glyphhanger = require('glyphhanger');
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      warn(err);
      process.exit(0);
    }
  }

  await new Promise((resolve) => {
    if (glyphhanger) {
      return resolve();
    }

    log('Installing glyphhanger dependency.');
    exec('npm install glyphhanger', null, (err) => {
      if (err) {
        warn(`Error installing glyphhanger: ${err}`);
        return;
      }

      return resolve();
    });
  });

  const subsetPath = path.join(
    downloadDirectory,
    subsetFrom,
  );

  const subsetHelper = fontHelpers.find(({
    family,
    fontWeight,
    defVariant,
  }) => (
    family === subsetFrom &&
      fontWeight === 400 &&
      defVariant === FontStyles.Normal
  ));

  let rangeSegment;
  if (/^us[_-]ascii$/i.test(subsetRange)) {
    rangeSegment = '--US_ASCII';
  } else if (/^latin$/i.test(subsetRange)) {
    rangeSegment = '--LATIN';
  } else {
    rangeSegment = `--whitelist=${subsetRange}`;
  }

  let formatSegment = '--formats=';
  if (Array.isArray(subsetFormat)) {
    formatSegment += subsetFormat.join('');
  } else {
    formatSegment += subsetFormat;
  }

  const cmd =
    'glyphhanger ' +
      `--subset=${fontPath} ` +
      `${rangeSegment} ` +
      `${formatSegment} `;

  exec(
    cmd,
    null,
    (err) => {
      if (err) {
        error(`exec error: ${err}`);
        return;
      }

      log('Completed subsetting font.');
    },
  ); 
})();
