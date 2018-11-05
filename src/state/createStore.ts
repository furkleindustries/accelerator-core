import {
  createStore as reduxCreateStore,
} from 'redux';
import {
  rootReducer,
} from '../reducers/rootReducer';

export const createStore = (prerenderedState?: object) => {
  const store = reduxCreateStore(
    rootReducer,
    prerenderedState,
    // @ts-ignore
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  if (process.env.NODE_ENV === 'development') {
    if ((module as any).hot) {
      (module as any).hot.accept('../reducers/rootReducer', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};
