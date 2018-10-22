import {
  App,
} from './components/App/App';
import {
  createStore,
} from './functions/createStore';
import {
  initializeStore,
} from './functions/initializeStore';
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

// @ts-ignore
import passagesManifest from '../passages/passages-manifest.json';

/* Allow state to be saved on prerender and reused when the window is opened.
 * This will prevent a lot of unneeded function calls and logic. */
// @ts-ignore
const prerenderedState = window && window.REDUX_STATE;
const store = (() => {
  if (prerenderedState) {
    return createStore(prerenderedState);
  }

  const createdStore = createStore();
  initializeStore(createdStore, passagesManifest);
  if (window) {
    // @ts-ignore
    window.REDUX_STATE = JSON.stringify(createdStore.getState());
  }

  return createdStore;
})();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
