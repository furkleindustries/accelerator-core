import * as fs from 'fs-extra';
import {
  getAutogeneratedFileWarningText,
} from './functions/getAutogeneratedFileWarningText';
import {
  getAuthoredImportsMetadata,
} from './functions/getAuthoredImportsMetadata';
import {
  getHotReloadAcceptor,
} from './functions/getHotReloadAcceptor';
import {
  getAuthoredAssetObjectDefinitions,
} from './functions/getAuthoredAssetObjectDefinitions';
import * as path from 'path';
import {
  setUnhandledRejectionEvent,
} from './functions/setUnhandledRejectionEvent';
import {
  scrapeAssets,
} from './functions/scrapeAssets';

setUnhandledRejectionEvent();

const authoredMutatorsDir = path.join(__dirname, '..', 'ink-mutators');

(async () => {
  try {
    const files = await scrapeAssets(authoredMutatorsDir);

    const {
      importPaths,
      imports,
      registry,
    } = getAuthoredImportsMetadata(files);

    const authoredAssets = getAuthoredAssetObjectDefinitions(files);
    const hotReloadAcceptor = getHotReloadAcceptor(importPaths);

    const manifestStr =
      getAutogeneratedFileWarningText() +
      '\n\nimport {\n  InkMutatorsManifestItem,\n} from \'../src/ink-mutators/InkMutatorsManifestItem\';\n' +
      '\n' +
      (imports.length ? `${imports.join('\n')}\n\n` : '') +
      'const manifest: readonly InkMutatorsManifestItem[] = ' +
      (authoredAssets.length ? `[\n${authoredAssets.join('\n\n')}\n];` : '[];') +
      '\n\n' +
      'export default manifest;\n\n' +
      `export const registry = ${JSON.stringify(registry, null, 2)};\n` +
      (hotReloadAcceptor ? `\n${hotReloadAcceptor}` : '');

    const manifestPath = path.join(authoredMutatorsDir, 'ink-mutators-manifest.ts');
    await fs.writeFile(manifestPath, manifestStr);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
