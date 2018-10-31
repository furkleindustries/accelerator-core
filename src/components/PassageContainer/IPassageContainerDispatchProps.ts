import {
  IAction,
} from '../../actions/IAction';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';
import {
  IStoryStateUpdateAction,
} from '../../actions/IStoryStateUpdateAction';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContainerDispatchProps {
  dispatch(action: IAction): IAction;
  navigateTo(passageName: string, tags?: Tag[]): void;
  setStoryState(updatedStateProps: Partial<IStoryStateInstance>): IStoryStateUpdateAction;
  restart(): void;
}

export default IPassageContainerDispatchProps;
