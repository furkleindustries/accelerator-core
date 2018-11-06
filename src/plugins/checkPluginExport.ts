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

  CONTENTS_MISSING:
    'The plugin object had no contents element.',

  NAME_MISSING:
    'The plugin object had no name string.',

  PLUGIN_INVALID:
    'The plugin argument was not an object.',

  PLUGIN_NO_LIFECYCLE_METHODS:
    'The plugin object had none of the following lifecycle methods:\n' +
    methods.join(', '),
};

/* This function returns an error string if the plugin fails, and null if it is
 * a normal plugin object. */
export const checkPluginExport = (plugin: any) => {
  if (!plugin || typeof plugin !== 'object') {
    throw new Error(strings.PLUGIN_INVALID);
  }

  if (!plugin.name || typeof plugin.name !== 'string') {
    throw new Error(strings.NAME_MISSING);
  }

  if (!plugin.contents || typeof plugin.contents !== 'object') {
    throw new Error(strings.CONTENTS_MISSING);
  }

  let count = 0;

  methods.forEach((method) => {
    if (typeof plugin.contents[method] === 'function') {
      count += 1;
    }
  });
  
  if (count === 0) {
    throw new Error(strings.PLUGIN_NO_LIFECYCLE_METHODS);
  }

  if (!plugin.contents) {
    throw new Error(strings.CONTENTS_MISSING);
  } else if (typeof plugin.contents !== 'object' &&
              typeof plugin.contents !== 'function') {
    throw new Error(strings.CONTENTS_INVALID);
  }

  return null;
}
