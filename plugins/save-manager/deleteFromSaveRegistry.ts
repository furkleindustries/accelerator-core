import {
  computeSaveVirtualFileKey,
} from './computeSaveVirtualFileKey';
import {
  getSaveRegistry,
} from './getSaveRegistry';
import {
  IStorySerializationPointer,
} from '../../src/state/IStorySerializationPointer';

export const deleteFromSaveRegistry = (
  entry: IStorySerializationPointer,
): void => {
  try {
    const registry = getSaveRegistry();
    delete registry[entry.saveName];
  
    const { localStorage } = window;
    localStorage.XLR8R_SAVE_REGISTRY = JSON.stringify(registry);
  
    const saveKey = computeSaveVirtualFileKey(entry);
    delete localStorage[saveKey];
  } catch (err) {
    console.warn(err);
  }
};
