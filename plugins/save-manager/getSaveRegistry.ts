import {
  IStoryStateSavePointerMap,
} from '../../src/state/IStoryStateSavePointerMap';

export const getSaveRegistry = (): IStoryStateSavePointerMap => {
  try {
    const { localStorage } = window;
    const deserialized = JSON.parse(localStorage.XLR8R_SAVE_REGISTRY);
    return deserialized;
  } catch (err) {}

  return {};
};
