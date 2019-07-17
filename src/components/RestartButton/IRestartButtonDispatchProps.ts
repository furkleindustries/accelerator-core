import {
  IStoryResetAction,
} from '../../actions/IStoryResetAction';
import {
  Dispatch,
} from 'redux';

export interface IRestartButtonDispatchProps {
  readonly dispatch: Dispatch<IStoryResetAction>;
}
