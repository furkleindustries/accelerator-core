import {
  IHeader,
} from '../../passages/IHeader';
import {
  createContext,
} from 'react';

let headersContext: React.Context<{ headers: IHeader[] }> | null = null;
export function getHeadersContext() {
  if (!headersContext) {
    headersContext = createContext(undefined as any);
  }

  return headersContext;
}
