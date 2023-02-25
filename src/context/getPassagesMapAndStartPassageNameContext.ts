import {
  IPassagesMapContext,
} from './IPassagesMapContext';
import {
  createContext,
} from 'react';

let passagesMap: React.Context<IPassagesMapContext> | null = null;
export const getPassagesMapAndStartPassageNameContext = () => {
  if (!passagesMap) {
    passagesMap = createContext(undefined as any);
  }

  return passagesMap;
};
