import {
  IContext,
} from './IContext';
import {
  createContext,
} from 'react';
import {
  assertValid,
} from 'ts-assertions';

let appContext: React.Context<IContext> = null as any;
export const getAppContext = (initialContext?: IContext): React.Context<IContext> => {
  if (!appContext && initialContext) {
    appContext = createContext(initialContext);
  }
  
  return assertValid<React.Context<IContext>>(
    appContext,
    'The result of React.createContext was invalid in getAppContext.',
  );
};
