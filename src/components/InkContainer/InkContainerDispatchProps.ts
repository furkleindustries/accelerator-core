import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';

export interface InkContainerDispatchProps {
  readonly setStoryState: (updatedStoryState: IStoryStateFrame) => void;
}
