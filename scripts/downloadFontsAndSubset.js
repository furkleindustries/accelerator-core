import chalk from 'chalk';
import {
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
import {
  installGlyphHanger,
} from './functions/installGlyphHanger';
import * as path from 'path';
import {
  paths,
} from '../config/paths';
import {
  setUnhandledRejectionEvent,
} from './functions/setUnhandledRejectionEvent';
import slash from 'slash';
import {
  subsetFont,
} from '../src/fonts/subsetFont';

setUnhandledRejectionEvent();

const {
  fontsToLoad,
  subsetFont: maybeSubsetFont,
} = getNormalizedAcceleratorConfig();

let subsetFontObject = maybeSubsetFont || null;

/* Don't do anything if the user doesn't indicate any fonts to load. */
if (!fontsToLoad) {
  warn(
    'No fontsToLoad property was present in accelerator.config.js, and no ' +
      'fonts will be loaded.',
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

(async () => {
  try {
    await fs.remove(paths.fontsAutogenerationDir);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      warn('Encountered an error removing the public/fonts/ directory.');
      printWarning(err);
      process.exit(0);
    }
  }

  try {
    await fs.mkdirp(paths.fontsAutogenerationDir);
  } catch (err) {
    warn('Encountered an error creating the public/fonts/ directory.');
    printWarning(err);
    process.exit(0);
  }

  const fontFaceRules = [];
  let fontFiles;
  const fontHelpers = await Promise.all(fontsToLoad.map(downloadFontHelper));  
  try {
    fontFiles = (await Promise.all(fontHelpers.map((fontHelper, index) => {
      fontFaceRules.push(...getFontFaceRules(paths.fontsAutogenerationDir, fontsToLoad[index], fontHelper));
      return downloadFontFiles(fontsToLoad[index], fontHelper, paths.fontsAutogenerationDir);
    }))).reduce((oneDArr, twoDArr) =>  oneDArr.concat(twoDArr), []);
  } catch (err) {
    printWarning(err);
    process.exit(0);
  }

  log('Downloaded fonts successfully.');
  log(
    'Fonts downloaded:\n' +
      `  ${fontFiles.map((name) => chalk.bold(slash(name))).join(',\n  ')}.`
  );

  let subsetName;
  if (subsetFontObject) {
    log('Installing glyphhanger dependency for font subsetting.');
    await installGlyphHanger();

    log('Subsetting font.');
    let retObj;
    try {
      retObj = subsetFont({
        fontsToLoad,
        publicUrl: paths.publicUrl,
        subsetFont: subsetFontObject,
        directory: paths.fontsAutogenerationDir,
      });
    } catch (err) {
      warn('Subsetting failed with the following error:');
      warn(err);
      warn(genericWarning);
    }

    if (retObj && retObj.fontFaceRule && retObj.subsetName) {
      fontFaceRules.push(retObj.fontFaceRule);
      subsetName = retObj.subsetName;
    }
  } else {
    log(
      'No subsetFont property was present in accelerator.config.js, and no ' +
      'subset will be created.'
    );
  }

  const fontLoaderStyle = 
    `body { font-family: sans-serif; }\n` +
    (
      subsetName ?
        `.fonts-stage-1 body { font-family: '${subsetName}' Subset, sans-serif; }\n` +
        `.fonts-stage-2 body { font-family: '${subsetName}', sans-serif; }\n` :
        `.fonts-stage-1 body { font-family: sans-serif; }\n` +
        `.fonts-stage-2 body { font-family: '${fontsToLoad[0].family}', sans-serif; }\n`
    ) +
    `.fonts-stage-2 .light { font-weight: 300; }\n` +
    `.fonts-stage-2 strong { font-weight: 500; }\n\n` +
    fontFaceRules.join('\n\n');

  const fontFacePath = path.join(paths.fontsAutogenerationDir, 'fontface-autogen.css');
  try {
    await fs.writeFile(fontFacePath, fontLoaderStyle);
  } catch (err) {
    warn('Encountered an error while writing the @font-face file.');
    printWarning(err);
    return;
  }
})();
