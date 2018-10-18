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
import * as ReactDOM from 'react-dom';

import './index.css';

// @ts-ignore
import passagesManifest from '../passages/passages-manifest.json';

const store = createStore();

populateStoreWithPassages(store, passagesManifest).then((data) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppConnected />
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
  
  registerServiceWorker();
}, (err) => {
  throw err;
});

