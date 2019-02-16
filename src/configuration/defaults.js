import {
  ActionTypes,
} from '../actions/ActionTypes';

export const defaults = {
  storyTitle: '%name%',
  storyDescription:
    'A story created with the Accelerator hypertext fiction framework ' +
    '(https://github.com/furkleindustries/accelerator-core).',

  debug: false,
  historySaveTypes: [
    ActionTypes.Bookmark,
    ActionTypes.PassageNavigation,
    ActionTypes.MidrenderSignal,
  ],

  historyStackLimit: 500,

  historySynchronizeUnrewindableStateWithPresent: true,

  publicUrl: '.',
};
