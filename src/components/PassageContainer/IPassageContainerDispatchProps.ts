import {
  IAction,
} from '../../actions/IAction';
import {
  IStoryStateAction,
} from '../../actions/IStoryStateAction';

export interface IPassageContainerDispatchProps {
  setStoryState(newState: { [key: string]: any, }): IStoryStateAction;
  dispatch(action: IAction): IAction;
}

export default IPassageContainerDispatchProps;
