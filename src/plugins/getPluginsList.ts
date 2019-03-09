import {
  checkPluginAsset,
} from './checkPluginAsset';
import {
  IPlugin,
} from './IPlugin';
import {
  IPluginExport,
} from './IPluginExport';
import {
  assert,
} from 'ts-assertions';

import manifest from '../../plugins/plugins-manifest';

export const strings = {
  PLUGINS_MANIFEST_INVALID:
    'The plugins-manifest.json file was not parseable into an array.',

  PLUGIN_OBJECT_INVALID:
    'One of the plugin objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%.',
};

assert(Array.isArray(manifest), strings.PLUGINS_MANIFEST_INVALID);

/* Memoize results and return them without computation on repeat calls. */
let pluginsList: IPlugin[] | null = null;

export function getPluginsList(): IPlugin[] {
  /* Return the memoized list if it exists. */
  if (pluginsList) {
    return pluginsList;
  }

  type temp = { [key: string]: IPluginExport[] } & { none: IPluginExport[] };
  const pluginsPrecedenceMap: temp = { none: [] };

  manifest.forEach(({
    asset,
    filepath,
  }) => {
    const pluginObj = asset;
    try {
      checkPluginAsset(pluginObj);
    } catch (err) {
      const errStr = strings.PLUGIN_OBJECT_INVALID
        .replace('%FILEPATH%', filepath)
        .replace('%REASON%', err);
  
      throw new Error(errStr);
    }

    if (typeof pluginObj.precedence === 'number' &&
        !Number.isNaN(pluginObj.precedence))
    {
      const precedence = String(pluginObj.precedence);
      if (!pluginsPrecedenceMap[precedence]) {
        pluginsPrecedenceMap[precedence] = [];
      }

      pluginsPrecedenceMap[precedence].push(pluginObj);
    } else {
      pluginsPrecedenceMap.none.push(pluginObj);
    }
  });

  /* Sort precedence in descending lexicographic order. In practice, this means
   * 4, 3, 2, 1, and then 'none' is always appended. */
  const keys = Object.keys(pluginsPrecedenceMap).sort((aa, bb) => {
    if (aa !== 'none' && (bb === 'none' || aa > bb)) {
      return -1;
    } else if (aa === bb) {
      return 0;
    }

    return 1;
  });

  pluginsList = keys.map<IPluginExport[]>((key) => (
    /* Sort the plugins in each precedence in ascending lexicographic
     * order. */
    pluginsPrecedenceMap[key]
      .filter(((exp) => exp.content))
      .sort((aa, bb) => {
        if (aa.name === bb.name) {
          return 0;
        } else if (aa.name > bb.name) {
          return 1;
        }

        return -1;
      })
  )).reduce<IPlugin[]>((prev, curr) => (
    prev.concat(curr.map((aa) => aa.content!))
  ), []);

  return pluginsList;
}
