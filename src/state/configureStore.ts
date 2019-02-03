import {
  Store,
} from 'redux';

export const strings = {};

export function configureStore(store: Store) {
  //(window as any).STORE = store;
  return store;
}
