import {
  IAction,
} from '../../actions/IAction';
import {
  IStoryStateAction,
} from '../../actions/IStoryStateAction';

export interface IPassageContainerDispatchProps {
  setStoryState(key: string, value: any): IStoryStateAction;
  dispatch(action: IAction): IAction;
}

export default IPassageContainerDispatchProps;
