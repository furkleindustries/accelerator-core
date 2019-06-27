import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  BuiltInRenderers,
} from '../renderers/BuiltInRenderers';

export const configurationDefaults = Object.freeze({
  debug: false,
  historySaveTypes: [
    ActionTypes.Bookmark,
    ActionTypes.PassageNavigation,
    ActionTypes.PassageTime,
    ActionTypes.MidrenderSignal,
  ],
  
  historyStackLimit: 500,
  historySynchronizeUnrewindableStateWithPresent: true,
  /* This path must be relative to the config, not the defaults file. */
  publicUrl: '',
  rendererName: BuiltInRenderers.SinglePassageRenderer,
  showMenu: true,
  storyDescription:
    'A story created with the Accelerator hypertext fiction framework ' +
    '(https://github.com/furkleindustries/accelerator-core).',

  storyTitle: 'Untitled Accelerator Story',
});
