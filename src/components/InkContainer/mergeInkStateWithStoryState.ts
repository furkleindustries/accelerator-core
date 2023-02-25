import {
  getRawInkValue,
} from '../../functions/ink/getRawInkValue';
import {
  IStoryStateSetter,
} from '../../interfaces/IStoryStateSetter';
import type {
  Story,
} from 'inkjs/engine/Story';

export const mergeInkStateWithStoryState = (
  story: Story,
  setStoryState: IStoryStateSetter,
) => {
  const stateToUpdate: Record<string, any> = {};

  for (const key of Object.keys(story.variablesState.$)) {
    const rawVal = getRawInkValue(story, key);
    if (rawVal !== 'XLR8R_PREVIOUS_VALUE') { 
      stateToUpdate[key] = rawVal;
    }
  }

  setStoryState(stateToUpdate);
};
