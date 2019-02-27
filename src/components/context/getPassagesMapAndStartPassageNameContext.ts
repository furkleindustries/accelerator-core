import {
  IPassagesMapAndStartPassageNameContext,
} from './IPassagesMapAndStartPassageNameContext';
import {
  createContext,
} from 'react';

let passagesMapAndStartPassageName: React.Context<IPassagesMapAndStartPassageNameContext> | null = null;
export function getPassagesMapAndStartPassageNameContext() {
  if (!passagesMapAndStartPassageName) {
    passagesMapAndStartPassageName = createContext(undefined as any);
  }

  return passagesMapAndStartPassageName;
}
