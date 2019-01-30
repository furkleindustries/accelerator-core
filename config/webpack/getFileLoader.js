module.exports = function getFileLoader() {
  // "file" loader makes sure assets end up in the `build` folder.
  // When you `import` an asset, you get its filename.
  // This loader doesn't use a "test" so it will catch all modules
  // that fall through the other loaders.
  return {
    loader: require.resolve('file-loader'),

    // Exclude `js` files to keep "css" loader working as it injects
    // it's runtime that would otherwise be processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [ /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/ ],
    options: { name: 'static/media/[name].[hash:8].[ext]' },
  };
}