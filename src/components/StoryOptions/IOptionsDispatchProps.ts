import {
  IOptionUpdateAction,
} from '../../actions/IOptionUpdateAction';
import {
  Dispatch,
} from 'redux';

export interface IOptionsDispatchProps {
  readonly dispatch: Dispatch<IOptionUpdateAction>;
}
