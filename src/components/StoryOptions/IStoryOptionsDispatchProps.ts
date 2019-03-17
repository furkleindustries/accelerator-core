import {
  IStoryOptionUpdateAction,
} from '../../actions/IStoryOptionUpdateAction';
import {
  Dispatch,
} from 'redux';

export interface IStoryOptionsDispatchProps {
  readonly dispatch: Dispatch<IStoryOptionUpdateAction>;
}
