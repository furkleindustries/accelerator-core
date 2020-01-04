import {
  IDispatchAware,
} from '../../interfaces/IDispatchAware';
import {
  IStoryResetAction,
} from '../../actions/IStoryResetAction';

export interface IRestartButtonDispatchProps
  extends IDispatchAware<IStoryResetAction>
{
}
