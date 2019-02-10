import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  createContext,
} from 'react';

let passagesMapAndStartPassageName: React.Context<{
  passagesMap: IPassagesMap,
  startPassageName: string,
}> | null = null;

export function getPassagesMapAndStartPassageNameContext() {
  if (!passagesMapAndStartPassageName) {
    passagesMapAndStartPassageName = createContext(undefined as any);
  }

  return passagesMapAndStartPassageName;
}
