import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryState,
} from '../../state/IStoryState';

export interface IPassageContainerOwnProps {
  passage: IPassage;
  storyState: IStoryState;
}

export default IPassageContainerOwnProps;
