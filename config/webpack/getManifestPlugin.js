import * as ManifestPlugin from 'webpack-manifest-plugin';

// Generate a manifest file which contains a mapping of all asset filenames
// to their corresponding output file so that tools can pick it up without
// having to parse `index.html`.
export function getManifestPlugin(publicPath) {
  return new ManifestPlugin({
    publicPath,
    fileName: 'asset-manifest.json',
  });
}
