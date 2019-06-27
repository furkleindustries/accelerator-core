import {
  warn,
} from 'colorful-logging';
import {
  readFileSync,
} from 'fs-extra';
import {
  paths,
} from '../paths';

// Makes the config variables available in index.html.
export function getTemplatingData(config) {
  const {
    fontsToLoad,
    subsetFont,
  } = config;

  let failed = false;
  let fontLoaderStyle = '';
  
  try {
    fontLoaderStyle = readFileSync(paths.fontAutogeneratedStyle);
  } catch (err) {
    failed = true;
    warn(err);
  }

  let subsetFontConditionalStatement = '';
  if (fontsToLoad && !failed) {
    subsetFontConditionalStatement =
      `  loadFullFonts(true).then(\n` +
      `    console.log.bind(console),\n` +
      `    console.error.bind(console),` +
      `  );`;

    if (subsetFont) {
      subsetFontConditionalStatement =
        `  var subset = new FontFaceObserver('${subsetFont.fromFamily} Subset');\n` +
        `  /* Load full fonts even if the subset fails. Do not allow longer than 500ms. */\n` +
        `  subset.load(null, 500).then(\n` +
        `  function () { loadFullFonts(true); },\n` +
        `  function (err) {\n` +
        `    console.error('Subset loading encountered an error:', err);\n` +
        `    loadFullFonts(false);\n` +
        `  },\n` +
        `);`;
    }
  }

  const stringifiedConfig = Object.keys(config).reduce((ret, key) => {
    if (typeof config[key] === 'object') {
      ret[key] = JSON.stringify(config[key]);
    } else {
      ret[key] = config[key];
    }

    return ret;
  }, {})

  return {
    ...stringifiedConfig,
    fontLoaderStyle,
    subsetFontConditionalStatement,
    fontsToLoad: JSON.stringify(fontsToLoad),
  };
}
