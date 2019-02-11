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

if (isNode()) {
  // Makes the script crash on unhandled rejections instead of silently
  // ignoring them. In the future, promise rejections that are not handled will
  // terminate the Node.js process with a non-zero exit code.
  process.on('unhandledRejection', err => {
    throw err;
  });
}

/* Allow state to be saved on prerender and reused when the window is opened.
* This will avoid a lot of superfluous logic. */
declare const window: any;
const prerenderedState = window && window.REDUX_STATE;
const store = (() => {
  if (prerenderedState) {
    return createStore(prerenderedState);
  }
  
  return configureStore(createStore());
})();

let state: IState = prerenderedState;
if (!state) {
  state = store.getState();
  window.REDUX_STATE = JSON.stringify(state);
}


/* Execute the logic in the initialization passage. */
(async () => await initialize())(); 

const renderFunc = () => render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);

renderFunc();

registerServiceWorker();
