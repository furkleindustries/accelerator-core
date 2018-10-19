import {
  AppConnected,
} from './components/App/App';
import {
  createStore,
} from './functions/createStore';
import {
  populateStoreWithPassages,
} from './functions/populateStoreWithPassages';
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

const store = createStore();

populateStoreWithPassages(store, passagesManifest);

render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
