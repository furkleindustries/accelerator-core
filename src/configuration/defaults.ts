import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IAcceleratorConfig,
} from './IAcceleratorConfig';

export const defaults: IAcceleratorConfig = {
  debug: false,
  historyStackLimit: 500,
  /* Silly workaround for stupid TypeScript bug where it does not properly
   * narrow the type for an obvious usage of an array literal. */
  historySaveTypes: [
    ActionTypes.Bookmark,
    ActionTypes.PassageNavigation,
  ],

  historySynchronizeUnrewindableStateWithPresent: true,

  publicUrl: './',

  storyDescription:
    'An untitled story written with Accelerator ' +
    '(https://github.com/furkleindustries/accelerator-core)',

  storyTitle:
    'Untitled Accelerator Story',

};
