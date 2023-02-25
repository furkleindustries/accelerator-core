import {
  IDispatchAware,
} from '../../interfaces/IDispatchAware';
import {
  IStoryOptionsDialogVisibleAction,
} from '../../actions/IStoryOptionsDialogVisibleAction';

export interface IStoryOptionsDispatchProps
  extends IDispatchAware<IStoryOptionsDialogVisibleAction>
{
}
