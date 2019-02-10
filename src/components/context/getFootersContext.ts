import {
  IFooter,
} from '../../passages/IFooter';
import {
  createContext,
} from 'react';

let footersContext: React.Context<{ footers: IFooter[] }> | null = null;
export function getFootersContext() {
  if (!footersContext) {
    footersContext = createContext(undefined as any);
  }

  return footersContext;
}
