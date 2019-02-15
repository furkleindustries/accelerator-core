// Makes the config variables available in index.html.
// The public URL is available as %publicUrl% in index.html,
// e.g.: <link rel="shortcut icon" href="%publicUrl%/favicon.ico">
// In development, this will be an empty string.
module.exports = function getInterpolateHtmlPlugin(config) {
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
    ...Object.keys(config).reduce((ret, key) => {
      if (typeof config[key] === 'object') {
        ret[key] = JSON.stringify(config[key]);
      } else {
        ret[key] = config[key];
      }

      return ret;
    }, {}),
    fontFaceObserver,
    fontLoader,
    fontLoaderStyle,
    fontsToLoad,
    subsetFont,
  })
}