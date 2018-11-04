import {
  App,
} from './components/App/App';
import {
  createStore,
} from './state/createStore';
import {
  getPluginsList,
} from './plugins/getPluginsList';
import {
  initializeStore,
} from './state/initializeStore';
import {
  IState,
} from './reducers/IState';
import {
  Provider,
} from 'react-redux';
import {
  registerServiceWorker,
} from './registerServiceWorker';

import * as React from 'react';

// @ts-ignore
import { render, } from 'react-snapshot';

import './index.scss';
import getPassagesMap from './passages/getPassagesMap';
import createStoryStateUpdateAction from './actions/creators/createStoryStateUpdateAction';

/* Allow state to be saved on prerender and reused when the window is opened.
 * This will avoid a lot of superfluous logic. */
// @ts-ignore
const prerenderedState = window && window.REDUX_STATE;
const store = (() => {
  if (prerenderedState) {
    return createStore(prerenderedState);
  }

  const createdStore = createStore();
  initializeStore(createdStore);
  return createdStore;
})();

let state: IState = prerenderedState;
if (!state) {
  state = store.getState();
  // @ts-ignore
  window.REDUX_STATE = JSON.stringify(state);
}

const {
  passagesMap,
} = getPassagesMap();

const plugins = getPluginsList();
plugins.forEach((plugin) => {
  if (typeof plugin.afterStoryInit === 'function') {
    plugin.afterStoryInit({
      store,
      currentPassageObject: passagesMap[state.currentPassageName],
      currentStoryState: state.storyStateHistory[0],
      lastLinkTags: state.passageHistory[0].linkTags,
      setStoryState(updatedStateProps) {
        /* Do NOT call mutateCurrentStoryStateInstance here, as it may cause an
         * infinite loop of plugin actions. */
        return store.dispatch(createStoryStateUpdateAction(updatedStateProps));
      },
    });
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
