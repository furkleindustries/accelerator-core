import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryState,
} from '../../state/IStoryState';

export interface IAppProps {
  currentPassage: IPassage;
  storyState: IStoryState;
}

export default IAppProps;
