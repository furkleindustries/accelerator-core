import {
  IPluginExport,
} from './IPluginExport';
import {
  IPlugin,
} from './IPlugin';
import {
  assert,
  assertValid,
} from 'ts-assertions';

const methods: Array<keyof IPlugin> = [
  'beforeStoryLoad',
  'afterStoryInit',
  'beforePassageChange',
  'beforeRender',
  'beforeStoryEnd',
  'afterPassageChange',
  'onAvailableChoices',
  'afterStoryStateChange',
  'beforeRestart',
];

export const strings = {
  CONTENT_INVALID:
    'The plugin object\'s content property was not an object or function.',

  NAME_MISSING:
    'The plugin object had no name string.',

  PLUGIN_INVALID:
    'The plugin argument was not an object.',

  PLUGIN_NO_LIFECYCLE_METHODS:
    'The plugin object had none of the following lifecycle methods:\n' +
      methods.join(', '),
};

/* This function returns an error string if the plugin fails, and true if it is
 * a normal plugin object. */
export const checkPluginAsset = (plugin: any): plugin is IPluginExport => {
  const {
    content,
    name,
  } = assertValid<IPluginExport>(
    plugin,
    strings.PLUGIN_INVALID,
  );

  assert(name && typeof name === 'string', strings.NAME_MISSING);

  if (content) {
    assert(typeof content === 'object', strings.CONTENT_INVALID);

    const count = methods.reduce((total, method) => (
      typeof content[method] === 'function' ? total + 1 : total
    ), 0);

    assert(count > 0, strings.PLUGIN_NO_LIFECYCLE_METHODS);
  }


  return true;
};
