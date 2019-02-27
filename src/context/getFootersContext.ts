import {
  IFootersContext,
} from './IFootersContext';
import {
  createContext,
} from 'react';

let footersContext: React.Context<IFootersContext> | null = null;
export function getFootersContext() {
  if (!footersContext) {
    footersContext = createContext(undefined as any);
  }

  return footersContext;
}
