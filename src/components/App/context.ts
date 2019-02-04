import {
  createContext,
} from 'react';
import {
  IManager,
  Manager,
} from 'sound-manager';

export const context: React.Context<{ soundManager: IManager }> = createContext({
  soundManager: new Manager(),
});
