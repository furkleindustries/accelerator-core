import {
  IOptionUpdateAction,
} from '../../actions/IOptionUpdateAction';
import {
  createOptionUpdateAction,
} from '../../actions/createOptionUpdateAction';
import {
  Dispatch,
} from 'redux';

export function updateOptionValue<T extends any = any>(
  dispatch: Dispatch<IOptionUpdateAction>,
  propName: string,
  value: T,
) {
  const action = createOptionUpdateAction(propName, value);
  return dispatch(action);
}
