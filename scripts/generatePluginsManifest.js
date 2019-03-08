import {
  error,
} from 'colorful-logging';
import * as fs from 'fs-extra';
import {
  getAutogeneratedFileWarning,
} from './functions/getAutogeneratedFileWarning';
import {
  getAuthoredAssetObjectDefinitions,
} from './functions/getAuthoredAssetObjectDefinitions';
import {
  getFileImports,
} from './functions/getFileImports';
import {
  getHotReloadAcceptor,
} from './functions/getHotReloadAcceptor';
import * as path from 'path';
import {
  scrapeAssets,
} from './functions/scrapeAssets';
import {
  setUnhandledRejectionEvent,
} from './functions/setUnhandledRejectionEvent';

setUnhandledRejectionEvent();

const authoredPluginsDir = path.join(__dirname, '..', 'plugins');

(async () => {
  try {
    const files = await scrapeAssets(authoredPluginsDir);

    const {
      importPaths,
      imports,
    } = getFileImports(files);
  
    const manifestStr =
      getAutogeneratedFileWarning() +
      'import { IPluginManifestItem } from \'../src/plugins/IPluginManifestItem\';\n' +
      imports.join('\n') +
      '\nconst manifest: IPluginManifestItem[] = [\n' +
      getAuthoredAssetObjectDefinitions(files).join('\n') +
      '\n];\n\n' +
      'export default manifest;\n' + 
      getHotReloadAcceptor(importPaths) +
      '\n';

    const manifestPath = path.join(authoredPluginsDir, 'plugins-manifest.ts');
    await fs.writeFile(manifestPath, manifestStr);
  } catch (err) {
    error(err);
    process.exit(1);
  }
})();
