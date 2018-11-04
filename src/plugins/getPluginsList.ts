import {
  checkPluginObject,
} from './checkPluginObject';
import {
  DebugPlugin,
} from '../passages/pluginsBundle';
import {
  IPlugin,
} from './IPlugin';
import {
  IPluginExport,
} from './IPluginExport';

import manifest from '../../plugins/plugins-manifest';

export const strings = {
  PLUGINS_MANIFEST_INVALID:
    'The plugins-manifest.json file was not parseable into an array.',

  PLUGIN_OBJECT_INVALID:
    'One of the plugin objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%.',
};

/* Memoize results and return them without computation on repeat calls. */
let pluginsList: IPlugin[] | null = null;

export const getPluginsList = (): IPlugin[] => {
  if (pluginsList) {
    return pluginsList;
  }

  if (!Array.isArray(manifest)) {
    throw new Error(strings.PLUGINS_MANIFEST_INVALID);
  }

  const pluginsPrecedenceMap: { [key: string]: IPluginExport[], } & { none: IPluginExport[], } = {
    none: [],
  };

  manifest.forEach((pluginFileObj) => {
    const pluginObj = pluginFileObj.pluginExport;
    const checkFailMsg = checkPluginObject(pluginObj);
    if (checkFailMsg) {
      const errStr = strings.PLUGIN_OBJECT_INVALID
        .replace('%FILEPATH%', pluginFileObj.filepath)
        .replace('%REASON%', checkFailMsg);

      throw new Error(errStr);
    }

    if (typeof pluginObj.precedence === 'number' &&
        !Number.isNaN(pluginObj.precedence))
    {
      const precedence = pluginObj.precedence.toString();
      if (!pluginsPrecedenceMap[precedence]) {
        pluginsPrecedenceMap[precedence] = [];
      }

      pluginsPrecedenceMap[precedence].push(pluginObj);
    } else {
      pluginsPrecedenceMap.none.push(pluginObj);
    }
  });

  /* Sort precedence in descending lexicographic order. In practice, this means
     4, 3, 2, 1, and then 'none' is always appended. */
  const keys = Object.keys(pluginsPrecedenceMap).sort((aa, bb) => {
    if (aa === 'none') {
      return 1;
    } else if (bb === 'none') {
      return -1;
    } else if (aa > bb) {
      return -1;
    } else if (aa === bb) {
      return 0;
    } else {
      return 1;
    }
  });

  pluginsList = keys.map<IPluginExport[]>((key) => (
    /* Sort the plugins in each precedence in ascending lexicographic
     * order. */
    pluginsPrecedenceMap[key].sort((aa, bb) => {
      if (aa.name < bb.name) {
        return -1;
      } else if (aa.name === bb.name) {
        return 0;
      } else {
        return 1;
      }
    })
  )).reduce<IPlugin[]>((prev, cur) => {
    return prev.concat(cur.map((aa) => aa.contents));
  }, []);

  pluginsList = (() => {
    /* If the story is being developed, and ACCELERATOR_DEBUG is true, inject
     * the DebugPlugin at the top of the stack. */
    if (process &&
        process.env &&
        process.env.NODE_ENV === 'development' &&
        process.env.ACCELERATOR_DEBUG === 'true')
    {
      return ([ new DebugPlugin() ] as IPlugin[]).concat(pluginsList);
    }

    return pluginsList;
  })();

  return pluginsList;
};
