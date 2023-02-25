import {
  computeSaveVirtualFileKey,
} from './computeSaveVirtualFileKey';
import {
  IStorySerialization,
} from '../../src/state/IStorySerialization';
import {
  IStorySerializationPointer,
} from '../../src/state/IStorySerializationPointer';

export const readFromSaveRegistry = (
  entry: IStorySerializationPointer,
): IStorySerialization => {
  const saveKey = computeSaveVirtualFileKey(entry);
  const { localStorage } = window;
  const { [saveKey]: saveFile } = localStorage;
  if (!saveFile) {
    throw new Error(
      `The save ID "${entry.uuid}" could not be found in the virtual file system.`
    );
  }

  let serialization: IStorySerialization;
  try {
    serialization = JSON.parse(saveFile);
  } catch (err) {
    throw new Error(
      `There was a problem deserializing the save with the ID "${entry.uuid}".`
    );
  }

  if (!serialization) {
    throw new Error(
      `The save name "${entry.saveName}" could not be found in the save registry.`
    );
  }

  return serialization;
};
