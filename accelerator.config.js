/** @see {@link https://github.com/furkleindustries/accelerator-core/tree/master/accelerator.config.d.ts} */

import { ActionTypes } from './src/actions/ActionTypes';
import { BuiltInRenderers } from './src/renderers/BuiltInRenderers';
import { FontFormats } from './src/fonts/FontFormats';
import { FontRanges } from './src/fonts/FontRanges';
import { FontStyles } from './src/fonts/FontStyles';

export default {
  /**
   * @property {string}
   * The page title which will be displayed in the browser.
   */
  storyTitle: '{{{name}}}',

  /**
   * @property {string} 
   * The description of the story. This should be short and illustrative, and
   * below 160 characters. Bear in mind this will appear in search results and
   * good descriptions drive traffic and positive SEO.
   */
  storyDescription:
    'A story created with the Accelerator hypertext fiction framework ' +
    '(https://github.com/furkleindustries/accelerator-core).',

  /**
   * @property {boolean}
   * This determines whether the DebugPlugin is used when (and only when) the
   * story is run in development (NODE_ENV=development) mode. It has no bearing on
   * the story when it is built for production.
   */
  debug: false,

  /**
   * @property {BuiltInRenderers | string}
   * The filename of the renderer. The corresponding file must be within
   * renderers/.
   * 
   * The renderer transforms context, state, and passage objects into React
   * elements shown to the user. This property defaults to a simple,
   * Twine-style single-passage-display rendering style. You may replace this
   * if you want a story to appear with an Ink or Twine 1 Jonah-style rendering
   * behavior, or something more exotic. 
   */
  /* TODO: fix lack of reactive rerendering in ScrollRenderer. Do not use
   * ScrollRenderer yet. */
  rendererName: BuiltInRenderers.SinglePassageRenderer,

  /**
   * @property {boolean}
   * Determines whether the menu is shown.
   */
  showMenu: true,

  /**
   * @property {Array<string | IFontLoadingDetails>}
   * @see {@link https://github.com/furkleindustries/accelerator-core/tree/master/src/fonts/IFontLoadingDetails.ts}
   * Each of the items in this list is constructed into a @font-face rule and
   * passed to the FontFaceObserver class and loaded, as-needed, at runtime.
   */
  fontsToLoad: [
    {
      family: 'Roboto',
      formats: [
        FontFormats.WOFF2,
        FontFormats.WOFF,
      ],

      styles: [
        FontStyles.Normal,
        FontStyles.Italic,
      ],

      ranges: [
        FontRanges.Latin,
        FontRanges.LatinExtended,
      ],

      weights: [
        300,
        400,
        500,
      ],
    },
  ],

  /**
   * @property {IFontSubsettingDetails}
   * @see {@link https://github.com/furkleindustries/accelerator-core/tree/master/src/fonts/IFontSubsettingDetails.ts}
   * Allows a temporary subset of the font to be loaded almost immediately.
   */
  subsetFont: {
    formats: [
      FontFormats.WOFF2,
      FontFormats.WOFF,
    ],

    fromFamily: 'Roboto',
    loadingStrategy: 'preload',
    subsetRange: 'US_ASCII',
  },

  /**
   * @property {string}
   * The path that should be prepended to static resource paths like the favicon
   * and js/css bundles. This will work fine for all cases except if you need to
   * know the absolute path the story is hosted at ahead of time.
   */
  publicUrl: '',

  /**
   * @property {string}
   * The Interactive Fiction ID of the story.
   */
  ifid: '{{{ifid}}}',

  /**
   * @property {number}
   * Determines how many undo states will be saved. Any point in history further
   * than this limit will be discarded and unreachable by the player. Important to
   * consider historySaveTypes when changing this.
   */
  historyStackLimit: 500,

  /**
   * @property {ActionTypes | ActionTypes[]}
   * @see {@link https://github.com/furkleindustries/accelerator-core/blob/master/src/actions/ActionTypes.d.ts}
   * Determines which Redux actions will be saved in the history, and therefore
   * which are usable as rewind points. Important to consider
   * historyStackLimit when changing this. Do not change this unless
   * you know what you're doing, as this setting has complex effects on
   * rewind semantics.
   */
  historySaveTypes: [
    ActionTypes.Bookmark,
    ActionTypes.PassageNavigation,
    ActionTypes.PassageTime,
  ],

  /**
   * @property {boolean}
   * Passed directly to redux-undo's undoable() syncFilter option.
   */
  historySynchronizeUnrewindableStateWithPresent: true,

  /**
   * @property {string}
   * The version of `accelerator-core` used to create the story.
   */
  acceleratorCoreVersion: '{{{coreVersion}}}',

  /**
   * @property {string}
   * The version of `accelerator-tool` used to create the story.
   */
  acceleratorToolVersion: '{{{toolVersion}}}',
};
