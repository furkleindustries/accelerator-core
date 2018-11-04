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

// @ts-ignore
const pluginsManifest: string[] = (() => {
  try {
    return require('../../plugins/plugins-manifest.json');
  } catch (e) {
    return [];
  }
})();

// tslint:disable
// @ts-ignore
const slash = require('slash');
// tslint:enable

export const strings = {
  pluginS_MANIFEST_INVALID:
    'The plugins-manifest.json file was not parseable into an array.',

  plugin_OBJECT_INVALID:
    'One of the plugin objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%.',
};

/* Memoize results and return them without computation on repeat calls. */
let pluginsList: IPlugin[] | null = null;

export const getPluginsList = (): IPlugin[] => {
  if (pluginsList) {
    return pluginsList;
  }

  if (!Array.isArray(pluginsManifest)) {
    throw new Error(strings.pluginS_MANIFEST_INVALID);
  }

  const pluginsPrecedenceMap: { [key: string]: IPluginExport[], } & { none: IPluginExport[], } = {
    none: [],
  };

  let pluginObjects: IPluginExport[];
  try {
    pluginObjects = pluginsManifest.map((path) => (
      /* Give webpack hints about where we're importing. If you don't do this,
       * webpack will bundle a lot of stuff you don't care about and show you a
       * confusing error about "Critical dependencies."
       * 
       * I had a much nicer async/import() setup here but rendering after a
       * promise resolves was not working at all, and it's doubtful anyone is
       * going to try to kitbash this into an SSR setup, so the client-side
       * difference is effectively nil.
       * 
       * Note also that requires frequently fail in the browser when using
       * Windows filepaths (modules are standardized with forward slashes)
       * so the call to slash should ameliorate this issue. */
      // @ts-ignore
      require(`../../plugins/${slash(path)}`)
    )).map((aa) => aa.default);
  } catch (err) {
    throw err;
  }

  pluginObjects.forEach((pluginObj, index) => {
    const checkFailMsg = checkPluginObject(pluginObj);
    if (checkFailMsg) {
      const errStr = strings.plugin_OBJECT_INVALID
        .replace('%FILEPATH%', pluginsManifest[index])
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
    if (process && process.env &&
        process.env.NODE_ENV === 'development' &&
        process.env.ACCELERATOR_DEBUG === 'true')
    {
      return ([ new DebugPlugin() ] as IPlugin[]).concat(pluginsList);
    }

    return pluginsList;
  })();

  return pluginsList;
};

export default getPluginsList;
