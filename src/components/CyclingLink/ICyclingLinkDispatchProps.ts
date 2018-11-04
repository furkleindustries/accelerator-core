import {
  IState,
} from '../../reducers/IState';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';
import {
  Store,
} from 'redux';

export interface ICyclingLinkDispatchProps {
  setStoryState(updatedStateProps: Partial<IStoryStateInstance>, store: Store<IState>): void;
}
