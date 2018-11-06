import {
  IStoryRewindAction,
} from '../../actions/IStoryRewindAction';
import {
  Dispatch,
} from 'redux';

export interface IRewindButtonDispatchProps {
  dispatch: Dispatch<IStoryRewindAction>;
}
