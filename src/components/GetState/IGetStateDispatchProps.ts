import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';

export interface IGetStateDispatchProps {
  readonly setStoryState: (updatedStoryState: IStoryStateFrame) => void;
}
