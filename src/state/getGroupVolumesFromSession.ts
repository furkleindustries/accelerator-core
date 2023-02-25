export const getGroupVolumesFromSession = (
  localStorageKey = 'XLR8R_SOUND_MANAGER_STATE',
): Record<string, number> => {
  try {
    const localStorage = window.localStorage;
    if (localStorageKey in localStorage) {
      const serialStr = localStorage[localStorageKey];
      return JSON.parse(serialStr);
    }
  } catch (err) {}

  return {};
};
