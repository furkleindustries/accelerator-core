import {
  IHeadersContext,
} from './IHeadersContext';
import {
  createContext,
} from 'react';

let headersContext: React.Context<IHeadersContext> | null = null;
export function getHeadersContext() {
  if (!headersContext) {
    headersContext = createContext(undefined as any);
  }

  return headersContext;
}
