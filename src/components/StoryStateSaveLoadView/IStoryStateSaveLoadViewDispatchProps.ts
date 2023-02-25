import {
  IStoryStateLoadAction,
} from '../../actions/IStoryStateLoadAction';
import {
  IStoryStateSaveAction,
} from '../../actions/IStoryStateSaveAction';
import {
  IStoryStateSaveDeleteAction,
} from '../../actions/IStoryStateSaveDeleteAction';
import {
  Dispatch,
} from 'redux';

export interface IStoryStateSaveLoadViewDispatchProps {
  readonly dispatch: Dispatch<IStoryStateSaveDeleteAction | IStoryStateLoadAction | IStoryStateSaveAction>
}
