import {
  IStorySerializationPointer,
} from '../../src/state/IStorySerializationPointer';

export const computeSaveVirtualFileKey = (
  { uuid }: IStorySerializationPointer,
): string => (
  `XLR8R_SAVE_${uuid.toUpperCase()}`
);
