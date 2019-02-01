import { ActionTypes } from './src/actions/ActionTypes';
import { IAcceleratorConfig } from './src/configuration/IAcceleratorConfig';

export const config: IAcceleratorConfig = {
  /**
   * @property {string}
   * The page title which will be displayed in the browser.
   */
  storyTitle: 'Untitled Accelerator Story',

  /** @property {string} 
   * The description of the story. This should be short and illustrative, and
   * below 160 characters. Bear in mind this will appear in search results and
   * good descriptions drive traffic and positive SEO.
   */
  storyDescription:
    'A story created with the Accelerator hypertext fiction framework.',

  /**
   * @property {boolean}
   * This determines whether the DebugPlugin is used when (and only when) the
   * story is run in development (NODE_ENV=development) mode. It has no bearing on
   * the story when it is built for production.
   */
  debug: true,

  /**
   * @property {string}
   * The path that should be prepended to static resource paths like the favicon
   * and js/css bundles. This will work fine for all cases except if you need to
   * know the absolute path the story is hosted at ahead of time.
   */
  publicUrl: './',

  /**
   * @property {number}
   * Determines how many undo states will be saved. Any point in history further
   * than this limit will be discarded and unreachable by the player. Important to
   * consider historySaveTypes when changing this.
   */
  historyStackLimit: 500,

  /**
   * @property {ActionTypes | ActionTypes[]}
   * Determines which Redux actions will be saved in the history, and therefore
   * which are usable as rewind points. Important to consider
   * historyStackLimit when changing this. Do not change this unless
   * you know what you're doing, as this setting has complex effects on
   * rewindability.
   */
  historySaveTypes: [
    ActionTypes.Bookmark,
    ActionTypes.MidrenderSignal,
    ActionTypes.PassageNavigation,
  ],

  /**
   * @property {boolean}
   * 
   */
  historySynchronizeUnrewindableStateWithPresent: true,
};
