import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IAcceleratorEnvVariables,
} from './IAcceleratorEnvVariables';

export const configurationDefaults: IAcceleratorEnvVariables = Object.freeze({
  debug: false,
  history_stack_limit: 500,
  /* Silly workaround for stupid TypeScript bug where it does not properly
   * narrow the type for an obvious usage of an array literal. */
  history_save_types: [
    ActionTypes.Bookmark,
    ActionTypes.PassageNavigation,
  ] as Array<ActionTypes.Bookmark | ActionTypes.PassageNavigation>,

  story_description:
    'An untitled story written with Accelerator ' +
    '(https://github.com/furkleindustries/accelerator-core)',

  story_title:
    'Untitled Accelerator Story',
});
