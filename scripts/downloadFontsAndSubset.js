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
  getFontFilepath,
} from '../src/fonts/getFontFilepath';
import {
  getNormalizedAcceleratorConfig,
} from '../src/configuration/getNormalizedAcceleratorConfig';
import * as path from 'path';
import {
  setUnhandledRejectionEvent,
} from './functions/setUnhandledRejectionEvent';
import {
  assert,
} from 'ts-assertions';
import { FontRanges } from '../src/fonts/FontRanges';
import { FontStyles } from '../src/fonts/FontStyles';
import { FontFormats } from '../src/fonts/FontFormats';

setUnhandledRejectionEvent();

const {
  fontsToLoad,
  subsetFont: maybeSubsetFont,
} = getNormalizedAcceleratorConfig();

const subsetFont = maybeSubsetFont || null;

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

  if (!subsetFont) {
    log(
      'No subsetFont property was present in accelerator.config.js, and no ' +
      'subset will be created.'
    );

    process.exit(0);
  }

  log('Subsetting font.');

  let GlyphHanger;
  try {
    GlyphHanger = require('glyphhanger');
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      warn(err);
      process.exit(0);
    }
  }

  await new Promise((resolve) => {
    if (GlyphHanger) {
      return resolve();
    }

    log('Installing glyphhanger dependency for font subsetting.');
    exec('npm install glyphhanger', null, (err) => {
      if (err) {
        warn(`Error installing glyphhanger: ${err}`);
        return;
      }

      return resolve();
    });
  })
  
  const { fromFamily } = subsetFont;

  const fontLoadingObj = fontsToLoad.find(({
    family,
  }) => family === fromFamily);

  assert(fontLoadingObj);

  const subsetPath = path.join(
    downloadDirectory,
    `${fromFamily} Subset`,
  );

  const {
    formats,
    family,
    ranges,
    weights,
  } = fontLoadingObj;

  const format = formats.indexOf(FontFormats.WOFF2) === -1 ?
    ranges[0] :
    FontFormats.WOFF2;

  const weight = weights.indexOf(400) === -1 ? weights[0] : 400;

  const pathOfFontToSubset = getFontFilepath({
    family,
    format,
    weight,
    directory: downloadDirectory,
    style: FontStyles.Normal,
  });

  const range = formats.indexOf(FontRanges.Latin) === -1 ?
    ranges[0] :
    FontRanges.Latin;

  const GlyphHangerFontFace = require('glyphhanger/src/GlyphHangerFontFace');
  const ghff = new GlyphHangerFontFace();
  ghff.setCSSOutput(true);
  
  const GlyphHangerSubset = require('glyphhanger/src/GlyphHangerSubset');
  const ghs = new GlyphHangerSubset();
  ghs.setOutputDirectory(downloadDirectory);
  ghs.setFormats(formats.join(','));
  ghs.setFontFilesGlob(pathOfFontToSubset);
  
  ghff.setSubset(ghs);

  const GlyphHangerWhitelist = require('glyphhanger/src/GlyphhangerWhitelist');
  let ghw;
  if (/^latin$/i.test(range)) {
    ghw = new GlyphHangerWhitelist(null, { LATIN: true });
  } else if (/^us[_-]ascii$/i.test(range)) {
    ghw = new GlyphHangerWhitelist(null, { US_ASCII: true });
  } else {
    ghw = new GlyphHangerWhitelist(range);
  }

  ghff.setUnicodeRange(range);

  const gh = new GlyphHanger();
  gh.setSubset(pathOfFontToSubset);
  gh.setWhitelist(ghw);  
  gh.output();

  ghs.subsetAll(ghw.getWhitelistAsUnicodes());

  ghff.setUnicodeRange(ghw.getWhitelistAsUnicodes());
  ghff.writeCSSFiles();
  ghff.output();
})();
