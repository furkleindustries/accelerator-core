import {
  initializeVirtualSaveRegistry,
} from './initializeVirtualSaveRegistry';
import type {
  LoggerFunc,
} from 'colorful-logging/LoggerFunc';

let initialized = false;

export const updateSoundManagerSessionVolume = (
  managerVolume: number,
  warnFunc: LoggerFunc,
  localStorageKey = 'XLR8R_SOUND_MANAGER_STATE',
) => {
  try {
    const { localStorage } = window;

    if (!initialized) {
      const err = initializeVirtualSaveRegistry();
      if (err) {
        throw err;
      } else {
        initialized = true;
      }
    }

    const readoutStr = localStorage[localStorageKey];
    const readout = JSON.parse(readoutStr);
    const updated = {
      ...readout,
      '__MANAGER': managerVolume,
    };

    const updatedStr = JSON.stringify(updated);
    localStorage[localStorageKey] = updatedStr;
  } catch (err) {
    warnFunc('There was an error updating session storage for group volumes.');
    warnFunc(err);
  }
};
