import {
  IState,
} from './IState';
import {
  createStore as reduxCreateStore,
  Store,
} from 'redux';
import {
  rootReducer,
} from '../reducers/rootReducer';

declare const window: any;

export const createStore = (prerenderedState?: IState): Store<IState> => {
  const store = reduxCreateStore(
    rootReducer,
    prerenderedState,
    (
      typeof window !== 'undefined' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
    ),
  );

  if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
