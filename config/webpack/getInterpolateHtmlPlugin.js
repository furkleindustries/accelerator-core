import * as fs from 'fs-extra';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import * as path from 'path';

const appDirPath = path.join(__dirname, '..', '..');
const publicDirPath = path.join(appDirPath, 'public');
const fontSrcDir = path.join(appDirPath, 'src', 'fonts');
const observerPath = path.join(fontSrcDir, 'fontFaceObserver.js');
const loaderPath = path.join(fontSrcDir, 'fontLoader.js');
const fontDirPath = path.join(publicDirPath, 'fonts');
const fontFaceStylePath = path.join(fontDirPath, 'fontface-autogen.css');

// Makes the config variables available in index.html.
// The public URL is available as %publicUrl% in index.html,
// e.g.: <link rel="shortcut icon" href="%publicUrl%/favicon.ico">
// In development, this will be an empty string.
export function getInterpolateHtmlPlugin(config) {
  const {
    fontsToLoad,
    subsetFont,
  } = config;

  const fontFaceObserver = fs.readFileSync(observerPath, 'utf8');
  let fontLoader = '';
  if (fontsToLoad) {
    let subsetFontConditionalStatement =
      `  loadFullFonts(true).then(\n` +
      `    console.log.bind(console),\n` +
      `    console.error.bind(console),` +
      `  );`;

    if (subsetFont) {
      subsetFontConditionalStatement =
        `  var subset = new FontFaceObserver('%subsetFont%');\n` +
        `  /* Load full fonts even if the subset fails. Do not allow longer than 500ms. */\n` +
        `  subset.load(null, 500).then(\n` +
        `  function () { loadFullFonts(true); },\n` +
        `  function (err) {\n` +
        `    console.error('Subset loading encountered an error:', err);\n` +
        `    loadFullFonts(false);\n` +
        `  },\n` +
        `);`;
    }

    fontLoader = fs.readFileSync(loaderPath, 'utf8')
      .replace('%fontsToLoad%', JSON.stringify(fontsToLoad))
      .replace(
        '%subsetFontConditionalStatement%',
        subsetFontConditionalStatement,
      );
  }

  const fontFaceStyle = fs.readFileSync(fontFaceStylePath, 'utf8');

  return new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
    ...Object.keys(config).reduce((ret, key) => {
      if (typeof config[key] === 'object') {
        ret[key] = JSON.stringify(config[key]);
      } else {
        ret[key] = config[key];
      }

      return ret;
    }, {}),
    fontFaceObserver,
    fontFaceStyle,
    fontLoader,
  });
}
