import * as fs from 'fs-extra';
import {
  getAuthoredAssetObjectDefinitions,
} from './functions/getAuthoredAssetObjectDefinitions';
import {
  getAutogeneratedFileWarningText,
} from './functions/getAutogeneratedFileWarningText';
import {
  getAuthoredImportsMetadata,
} from './functions/getAuthoredImportsMetadata';
import {
  getHotReloadAcceptor,
} from './functions/getHotReloadAcceptor';
import * as path from 'path';
import {
  setUnhandledRejectionEvent,
} from './functions/setUnhandledRejectionEvent';
import {
  scrapeAssets,
} from './functions/scrapeAssets';

setUnhandledRejectionEvent();

const authoredFootersDir = path.join(__dirname, '..', 'footers');

(async () => {
  try {
    const files = await scrapeAssets(authoredFootersDir);

    const {
      importPaths,
      imports,
      registry,
    } = getAuthoredImportsMetadata(files);

    const authoredAssets = getAuthoredAssetObjectDefinitions(files);
    const hotReloadAcceptor = getHotReloadAcceptor(importPaths);

    const manifestStr =
      getAutogeneratedFileWarningText() +
      '\n\nimport {\n  IFooterManifestItem,\n} from \'../src/passages/IFooterManifestItem\';\n' +
      '\n' +
      (imports.length ? `${imports.join('\n')}\n\n` : '') +
      'const manifest: readonly IFooterManifestItem[] = ' +
      (authoredAssets.length ? `[\n${authoredAssets.join('\n\n')}\n];` : '[];') +
      '\n\n' +
      'export default manifest;\n\n' +
      `export const registry = ${JSON.stringify(registry, null, 2)};\n` +
      (hotReloadAcceptor ? `\n${hotReloadAcceptor}` : '');

    const manifestPath = path.join(authoredFootersDir, 'footers-manifest.ts');
    await fs.writeFile(manifestPath, manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
