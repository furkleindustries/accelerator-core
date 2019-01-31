import {
  IAction,
} from '../../actions/IAction';
import {
  IState,
} from '../../state/IState';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';
import {
  Store, Dispatch,
} from 'redux';

export interface ICyclingLinkDispatchProps {
  dispatch: Dispatch<IAction>;
  setStoryState(updatedStateProps: Partial<IStoryStateInstance>, store: Store<IState>): void;
}
