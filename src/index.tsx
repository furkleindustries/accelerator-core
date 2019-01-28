import {
  default as App,
} from './components/App/App';
import {
  createStore,
} from './state/createStore';
import {
  initializeStore,
} from './state/initializeStore';
import {
  IState,
} from './state/IState';
import {
  Provider,
} from 'react-redux';
import {
  registerServiceWorker,
} from './registerServiceWorker';

import * as React from 'react';

// @ts-ignore
import { render } from 'react-snapshot';

import './index.scss';

import { setConfig } from 'react-hot-loader'

setConfig({ logLevel: 'debug' });

/* Allow state to be saved on prerender and reused when the window is opened.
 * This will avoid a lot of superfluous logic. */
// @ts-ignore
const prerenderedState = window && window.REDUX_STATE;
const store = (() => {
  if (prerenderedState) {
    return createStore(prerenderedState);
  }

  return initializeStore(createStore());
})();

let state: IState = prerenderedState;
if (!state) {
  state = store.getState();
  // @ts-ignore
  window.REDUX_STATE = JSON.stringify(state);
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);

registerServiceWorker();
