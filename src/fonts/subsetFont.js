import {
  FontStyles,
} from './FontStyles';
import {
  getFontFilepath,
} from './getFontFilepath';
import * as path from 'path';
import {
  assert,
} from 'ts-assertions';

export function subsetFont({
  directory,
  fontsToLoad,
  publicUrl,
  subsetFont: {
    fromFamily,
    subsetRange,
  },
}) {
  assert(directory);
  assert(Array.isArray(fontsToLoad) && fontsToLoad.length);
  assert(typeof publicUrl === 'string');
  assert(fromFamily);
  assert(subsetRange);

  const fontLoadingObjToSubset = fontsToLoad.find(({
    family,
  }) => family === fromFamily);

  if (!fontLoadingObjToSubset) {
    warn('No font loading object could be found for subsetting which ' +
          `matched the family "${fromFamily}".`);
    return getReturnObject();
  }

  const {
    formats,
    family,
    weights,
  } = fontLoadingObjToSubset;

  const format = formats[0];
  const weight = weights.indexOf(400) === -1 ? weights[0] : 400;

  const pathOfFontToSubset = getFontFilepath({
    directory,
    family,
    format,
    weight,
    style: FontStyles.Normal,
  });

  const GlyphHangerFontFace = require('glyphhanger/src/GlyphHangerFontFace');
  const ghff = new GlyphHangerFontFace();

  const GlyphHangerSubset = require('glyphhanger/src/GlyphHangerSubset');
  const ghs = new GlyphHangerSubset();
  ghs.setOutputDirectory(directory);
  ghs.setFormats(formats.join(','));
  ghs.setFontFilesGlob(pathOfFontToSubset);

  ghff.setSubset(ghs);

  const GlyphHangerWhitelist = require('glyphhanger/src/GlyphhangerWhitelist');
  let ghw;
  if (/^latin$/i.test(subsetRange)) {
    ghw = new GlyphHangerWhitelist(null, { LATIN: true });
  } else if (/^us[_-]ascii$/i.test(subsetRange)) {
    ghw = new GlyphHangerWhitelist(null, { US_ASCII: true });
  } else {
    ghw = new GlyphHangerWhitelist(subsetRange);
  }

  const unicodes = ghw.getWhitelistAsUnicodes();
  ghff.setUnicodeRange(unicodes);

  const gh = new (require('glyphhanger'))();
  gh.setSubset(pathOfFontToSubset);
  gh.setWhitelist(ghw);  
  gh.output();

  ghs.subsetAll(unicodes);

  ghff.setUnicodeRange(unicodes);
  ghff.output();

  const subsetName = `${fromFamily} Subset`;
  const subsetSrc = formats.map((format) => (
    `url('` +
      `${publicUrl}/` +
      `${path.basename(directory)}/` +
      `${path.parse(pathOfFontToSubset).name}-subset.${format}` +
    `') ` +
    `format('${format}')`
  )).join(', ');

  const fontFaceRule =
    `/* ${subsetRange} subset */\n` +
    `@font-face {\n` +
    `  font-family: '${subsetName}';\n` +
    `  font-style: normal;\n` +
    `  src: ${subsetSrc};\n` +
    `  unicode-range: ${unicodes};\n` +
    `}`;

  return getReturnObject(fontFaceRule, subsetName);
}

function getReturnObject(fontFaceRule, subsetName) {
  return {
    fontFaceRule: fontFaceRule || null,
    subsetName: subsetName || null,
  };
}
