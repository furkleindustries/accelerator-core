import {
  IAction,
} from '../../actions/IAction';
import {
  IStoryStateAction,
} from '../../actions/IStoryStateAction';
import {
  Tag,
} from 'src/tags/Tag';

export interface IPassageContainerDispatchProps {
  dispatch(action: IAction): IAction;
  setStoryState(updatedState: { [key: string]: any, }): IStoryStateAction;
  navigateTo(passageName: string, tags?: Tag[]): void;
}

export default IPassageContainerDispatchProps;
