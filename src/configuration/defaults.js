const { ActionTypes } = require('../actions/ActionTypes');

module.exports.defaults = {
  debug: false,
  historySaveTypes: [
    ActionTypes.Bookmark,
    ActionTypes.PassageNavigation,
    ActionTypes.MidrenderSignal,
  ],

  historyStackLimit: 500,

  historySynchronizeUnrewindableStateWithPresent: true,

  publicUrl: '.',

  storyDescription:
    'An untitled story written with Accelerator ' +
    '(https://github.com/furkleindustries/accelerator-core)',

  storyTitle:
    'Untitled Accelerator Story',
};
