import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';

export interface IPassageContainerStateProps {
  currentPassage: IPassage;
  currentStoryState: IStoryStateInstance;
}

export default IPassageContainerStateProps;
