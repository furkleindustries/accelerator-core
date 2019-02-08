import {
  createContext,
} from 'react';
import {
  IManager,
} from 'sound-manager';

let soundManagerContext: React.Context<{ soundManager: IManager }> | null = null;
export function getSoundManagerContext() {
  if (!soundManagerContext) {
    soundManagerContext = createContext(undefined as any);
  }

  return soundManagerContext;
}
