import {
  IDispatchAware,
} from '../../interfaces/IDispatchAware';
import {
  IStoryOptionUpdateAction,
} from '../../actions/IStoryOptionUpdateAction';

export interface IStoryOptionsDispatchProps
  extends IDispatchAware<IStoryOptionUpdateAction>
{
}
