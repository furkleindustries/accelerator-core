import {
  computeSaveVirtualFileKey,
} from './computeSaveVirtualFileKey';
import {
  configurationDefaults,
} from '../../src/configuration/configurationDefaults';
import {
  getSaveRegistry,
} from './getSaveRegistry';
import {
  getStorySerialization,
} from '../../src/state/getStorySerialization';
import {
  IState,
} from '../../src/state/IState';
import {
  IStorySerializationPointer,
} from '../../src/state/IStorySerializationPointer';
import {
  Store,
} from 'redux';

export const pushToSaveRegistry = (
  entry: IStorySerializationPointer,
  store: Store<IState>,
  framesToSave = configurationDefaults.historyFramesToSave,
): void => {
  try {
    const registry = getSaveRegistry();
    registry[entry.saveName] = entry;
  
    const localStorage = window.localStorage;
    localStorage['XLR8R_SAVE_REGISTRY'] = JSON.stringify(registry);
  
    const serialization = getStorySerialization(entry, store, framesToSave);
    const saveKey = computeSaveVirtualFileKey(entry);
    localStorage[saveKey] = JSON.stringify(serialization);
  } catch (err) {}
};
