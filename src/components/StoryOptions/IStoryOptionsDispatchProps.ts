import {
  IStoryOptionUpdateAction,
} from '../../actions/IStoryOptionUpdateAction';
import {
  Dispatch,
} from 'redux';

export interface IOptionsDispatchProps {
  readonly dispatch: Dispatch<IStoryOptionUpdateAction>;
}
