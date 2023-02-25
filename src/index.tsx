import {
  appDocumentSelector,
} from './renderers/appSelectors';
import {
  getDefaultSoundManagerState,
} from './state/getDefaultSoundManagerState';
import {
  getPrerenderedStateHistory,
} from './state/getPrerenderedStateHistory';
import {
  getSaveRegistry,
} from '../plugins/save-manager/getSaveRegistry';
import {
  IHistory,
} from './state/IHistory';
import {
  initializeVirtualSaveRegistry,
} from './state/initializeVirtualSaveRegistry';
import {
  default as initialStoryState,
} from '../passages/_constants/initialStoryState';
import {
  isNode,
} from './functions/isNode';
import {
  IState,
} from './state/IState';
import {
  IStateFrame,
} from './state/IStateFrame';
import {
  hydrate,
  render,
} from 'react-dom';
import {
  Provider,
} from 'react-redux';
import {
  Store,
} from 'redux';
import {
  newHistory,
} from 'redux-undo';

import * as React from 'react';

if (isNode()) {
  // Makes the script crash on unhandled rejections instead of silently
  // ignoring them. In the future, promise rejections that are not handled will
  // terminate the Node.js process with a non-zero exit code.
  process.on('unhandledRejection', (err) => { throw err; });
}

Promise.all([
  import('./components/App'),
  import('./state/createStore'),
  import('../passages/_context/getInitialContext'),
  import('./configuration/getNormalizedAcceleratorConfig'),
  import('./registerServiceWorker'),
  import('../passages/_global-styles/index.less'),
]).then(async (
    [
      { App },
      { createStore },
      { getInitialContext },
      { getNormalizedAcceleratorConfig },
      { registerServiceWorker },
    ]
  ) => {
    try {
      const config = getNormalizedAcceleratorConfig()
      const {
        autoplayer: autoplayerState,
        debug,
        loadAutosaveAtStart,
        loggers: { warn },
        startPassageName,
      } = config;

      /* Allow state to be saved on prerender and reused when the window is
       * opened. This will avoid a lot of superfluous logic. */
      let prerenderedStateHistory: IHistory | null = null;
      let store: Store<IState>;

      const err = initializeVirtualSaveRegistry();
      if (err) {
        warn(err.toString());
      } else {
        try {
          prerenderedStateHistory = await getPrerenderedStateHistory(loadAutosaveAtStart);
        } catch (err) {
          warn('Failed to get prerendered state.');
          warn(err.toString());
        }
      }

      if (prerenderedStateHistory) {
        const initialState = { 
          autoplayerState,
          currentSaveUuid: 'Autosave',
          debug,
          history: newHistory<IStateFrame>(
            [
              ...prerenderedStateHistory.past,

              {
                ...prerenderedStateHistory.present,
                storyState: {
                  ...initialStoryState,
                  ...prerenderedStateHistory.present.storyState,
                },
              },
            ],

            {
              ...prerenderedStateHistory.present,
              passageName: startPassageName,
              storyState: {
                ...initialStoryState,
                ...prerenderedStateHistory.present.storyState,
              },
            },

            [],
          ),

          passageReady: false,
          soundManagerState: { ...getDefaultSoundManagerState() },
          soundsLoaded: false,
          storyLoaded: false,
          storyOptionsDialogVisible: false,
          storyRequiresFullRerender: false,
          storyStateSavePointers: { ...getSaveRegistry() },
        };

        store = createStore(initialState);
      } else {
        store = createStore();
      }

      const component = (
        <Provider store={store}>
          <App initialContext={getInitialContext(store)} />
        </Provider>
      );

      const rootElement = document.body.querySelector(appDocumentSelector);
      if (!rootElement) {
        throw new Error(
          `Could not find the application element in the document. The selector used was ${appDocumentSelector}`
        );
      }

      if (rootElement.hasChildNodes()) {
        hydrate(component, rootElement);
      } else {
        render(component, rootElement);
      }

      rootElement.removeAttribute('aria-describedby');

      registerServiceWorker(config);
    } catch (err) {
      console.error(err);
    }
  },

  console.error.bind(console),
);
