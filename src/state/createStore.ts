import {
  createStore as reduxCreateStore,
} from 'redux';
import {
  rootReducer,
} from '../reducers/rootReducer';

declare const window: any;

export function createStore(prerenderedState?: object) {
  const store = reduxCreateStore(
    rootReducer,
    prerenderedState,
    (
      window &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
  );

  if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    (module as any).hot.accept('../reducers/rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
