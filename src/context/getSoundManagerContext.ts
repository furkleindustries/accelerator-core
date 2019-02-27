import {
  createContext,
} from 'react';
import {
  ISoundManagerContext,
} from './ISoundManagerContext';

let soundManagerContext: React.Context<ISoundManagerContext> | null = null;
export function getSoundManagerContext() {
  if (!soundManagerContext) {
    soundManagerContext = createContext(undefined as any);
  }

  return soundManagerContext;
}
