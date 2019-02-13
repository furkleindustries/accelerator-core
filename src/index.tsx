import {
  default as App,
} from './components/App/App';
import {
  createStore,
} from './state/createStore';
import {
  configureStore,
} from './state/configureStore';
import {
  initialize,
} from './passages/initialize';
import {
  isNode,
} from './functions/isNode';
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

const selector = '#root';

if (isNode()) {
  // Makes the script crash on unhandled rejections instead of silently
  // ignoring them. In the future, promise rejections that are not handled will
  // terminate the Node.js process with a non-zero exit code.
  process.on('unhandledRejection', err => { throw err; });
}

/* Allow state to be saved on prerender and reused when the window is opened.
* This will avoid a lot of superfluous logic. */
const prerenderedState = (window as any).REDUX_STATE;
const store = prerenderedState ?
  createStore(prerenderedState) :
  configureStore(createStore());

if (!prerenderedState) {
  (window as any).REDUX_STATE = JSON.stringify(store.getState());
}

/* Execute the logic in the initialization script. */
initialize(); 

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(selector),
);

registerServiceWorker();
