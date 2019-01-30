const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function getStyleLoaders({
  mode,
  cssOptions,
  preProcessor,
  publicPath,
})
{  
  // Some apps do not use client-side routing with pushState.
  // For these, "homepage" can be set to "./" to enable relative asset paths.
  const shouldUseRelativeAssetPaths = publicPath === './';

  // Source maps are resource heavy and can cause out of memory issue for large source files.
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

  // Some apps do not use client-side routing with pushState.
  // For these, "homepage" can be set to "./" to enable relative asset paths.
  const loaders = [
    (
      mode === 'development' ?
        require.resolve('style-loader') :
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              ...(
                shouldUseRelativeAssetPaths ?
                  { publicPath: '../../' } :
                  undefined
              ),
            },
          },

        {
          loader: require.resolve('css-loader'),
          options: cssOptions,
        }
    ),

    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: { flexbox: 'no-2009' },
            stage: 3,
          }),
        ],

        sourceMap: shouldUseSourceMap,
      },
    },
  ];

  if (preProcessor) {
    if (mode === 'development') {
      loaders.push(require.resolve(preProcessor));
    } else {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: { sourceMap: shouldUseSourceMap },
      });
    }
  }

  return loaders;
};
