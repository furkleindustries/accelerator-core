import {
  initializeVirtualSaveRegistry,
} from './initializeVirtualSaveRegistry';
import {
  ISoundManagerGroupStateFrame,
} from './ISoundManagerGroupStateFrame';
import type {
  LoggerFunc,
} from 'colorful-logging/LoggerFunc';

let initialized = false;

export const updateSoundGroupSessionVolume = (
  {
    groupName,
    volume,
  }: Omit<ISoundManagerGroupStateFrame, 'label'>,

  warnFunc: LoggerFunc,
  localStorageKey = 'XLR8R_SOUND_MANAGER_STATE',
) => {
  try {
    const { localStorage } = window;
    const readoutStr = localStorage[localStorageKey];

    if (!initialized) {
      const err = initializeVirtualSaveRegistry();
      if (err) {
        throw err;
      } else {
        initialized = true;
      }
    }

    const readout = JSON.parse(readoutStr);
    const updated = {
      ...readout,
      [groupName]: volume,
    };

    const updatedStr = JSON.stringify(updated);
    localStorage[localStorageKey] = updatedStr;
  } catch (err) {
    warnFunc('There was an error updating session storage for Sound Manager volumes.');
    warnFunc(err);
  }
};
