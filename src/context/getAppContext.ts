import {
  IContext,
} from './IContext';
import {
  createContext,
} from 'react';

let appContext: React.Context<IContext> | null = null;
export function getAppContext() {
  if (!appContext) {
    appContext = createContext(undefined as any);
  }

  return appContext;
}
