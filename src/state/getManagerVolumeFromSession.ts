import {
  isValidVolume,
} from 'sound-manager';

export const getManagerVolumeFromSession = (
  localStorageKey = 'XLR8R_SOUND_MANAGER_STATE',
): number => {
  try {
    const { localStorage } = window;
    if (localStorageKey in localStorage) {
      const { [localStorageKey]: serialStr } = localStorage;
      const deserialized = JSON.parse(serialStr);
      if (isValidVolume(deserialized.__MANAGER)) {
        return deserialized.__MANAGER;
      }
    }
  } catch (err) {}

  return 1;
};
