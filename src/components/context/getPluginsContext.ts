import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  createContext,
} from 'react';

let pluginsContext: React.Context<{ plugins: IPlugin[] }> | null = null;
export function getPluginsContext() {
  if (!pluginsContext) {
    pluginsContext = createContext(undefined as any);
  }

  return pluginsContext;
}
