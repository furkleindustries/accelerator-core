import {
  IStoryStateSetter,
} from '../../interfaces/IStoryStateSetter';
import {
  StoryWithDoneEvent,
} from '../../../lib/ink/StoryWithDoneEvent';

export const mergeInkStateWithStoryState = (
  {
    state: { toJson },
  }: StoryWithDoneEvent,
  setStoryState: IStoryStateSetter,
) => setStoryState(JSON.parse(toJson()));
