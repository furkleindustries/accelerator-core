import {
  IPluginsContext,
} from './IPluginsContext';
import {
  createContext,
} from 'react';

let pluginsContext: React.Context<IPluginsContext> | null = null;
export const getPluginsContext = () => {
  if (!pluginsContext) {
    pluginsContext = createContext(undefined as any);
  }

  return pluginsContext;
};
