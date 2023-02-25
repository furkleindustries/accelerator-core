import {
  configurationDefaults,
} from '../configuration/configurationDefaults';
import {
  IState,
} from './IState';
import {
  IStorySerialization,
} from './IStorySerialization';
import {
  IStorySerializationPointer,
} from './IStorySerializationPointer';
import type {
  Store,
} from 'redux';

export const getStorySerialization = (
  {
    saveName,
    uuid,
  }: IStorySerializationPointer,
  { getState }: Store<IState>,
  framesToSave = configurationDefaults.historyFramesToSave,
): IStorySerialization => {
  const {
    history: {
      past,
      present,
    },
  } = getState();

  // Add one to account for the present state frame.
  const sliceStartIndex = past.length - framesToSave + 1;
  
  return {
    engineHistory: {
      past: [ ...past.slice(sliceStartIndex, past.length) ],
      present: { ...present },
    },

    saveName,
    uuid,
  };
};
