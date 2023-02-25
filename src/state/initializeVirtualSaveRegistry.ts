export const initializeVirtualSaveRegistry = (
  registryKey = 'XLR8R_SAVE_REGISTRY',
  soundKey = 'XLR8R_SOUND_MANAGER_STATE',
): Error | null => {
  try {
    const localStorage = window.localStorage;
    if (!(registryKey in localStorage)) {
      localStorage[registryKey] = '{}';
    }
  
    if (!(soundKey in localStorage)) {
      localStorage[soundKey] = '{}';
    }
  } catch (err) {
    return err;
  }

  return null;
};
