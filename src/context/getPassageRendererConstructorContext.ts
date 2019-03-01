import {
  IPassageRendererConstructorContext,
} from './IPassageRendererConstructorContext';
import {
  createContext,
} from 'react';

let passageRendererConstructorContext: React.Context<IPassageRendererConstructorContext> | null = null;
export function getPassageRendererConstructorContext() {
  if (!passageRendererConstructorContext) {
    passageRendererConstructorContext = createContext(undefined as any);
  }

  return passageRendererConstructorContext;
}
