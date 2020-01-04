import {
  IDispatchAware,
} from '../../interfaces/IDispatchAware';
import {
  IStoryRewindAction,
} from '../../actions/IStoryRewindAction';

export interface IRewindButtonDispatchProps
  extends IDispatchAware<IStoryRewindAction>
{
}
