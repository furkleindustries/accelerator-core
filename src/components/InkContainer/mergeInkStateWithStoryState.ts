import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  StoryWithDoneEvent,
} from '../../../lib/ink/StoryWithDoneEvent';

export const mergeInkStateWithStoryState = (
  {
    state: { toJson },
  }: StoryWithDoneEvent,
  setStoryState: (updatedStoryState: IStoryStateFrame) => void,
) => setStoryState(JSON.parse(toJson()));
