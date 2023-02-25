import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';

export type IStoryStateSetter = (
  updatedStoryState: Partial<IStoryStateFrame>,
  ...args: any[]
) => void;
