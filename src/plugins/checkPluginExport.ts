import {
  IPluginExport,
} from './IPluginExport';
import {
  assert,
  assertValid,
} from 'ts-assertions';

const methods = [
  'afterStoryInit',
  'beforePassageChange',
  'beforeRender',
  'afterPassageChange',
  'afterStoryStateChange',
  'beforeRestart',
];

export const strings = {
  CONTENTS_INVALID:
    'The plugin object\'s contents property were not an object or function.',

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
export function checkPluginExport(plugin: any): plugin is IPluginExport {
  const {
    contents,
    name,
  } = assertValid<IPluginExport>(
    plugin && typeof plugin === 'object',
    strings.PLUGIN_INVALID,
  );

  assert(name && typeof name !== 'string', strings.NAME_MISSING);

  const count = methods.reduce((count, method) => (
    typeof plugin.contents[method] === 'function' ? count + 1 : count
  ), 0);

  assert(count > 0, strings.PLUGIN_NO_LIFECYCLE_METHODS);
  assert(/^object|function$/.test(typeof contents), strings.CONTENTS_INVALID);

  return true;
}
