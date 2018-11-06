import {
  IStoryRewindAction,
} from '../../actions/IStoryRewindAction';
import {
  Dispatch,
} from 'redux';

export interface IRestartButtonDispatchProps {
  dispatch: Dispatch<IStoryRewindAction>;
}
