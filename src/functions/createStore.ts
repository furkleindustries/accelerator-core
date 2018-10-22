import {
  createStore as reduxCreateStore,
} from 'redux';
import {
  rootReducer,
} from '../reducers/rootReducer';

export const createStore = (prerenderedState?: object) => reduxCreateStore(
  rootReducer,
  prerenderedState,
  // @ts-ignore
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default createStore;
