import {
  IStoryOptionUpdateAction,
} from '../../actions/IStoryOptionUpdateAction';
import {
  createStoryOptionUpdateAction,
} from '../../actions/creators/createStoryOptionUpdateAction';
import {
  Dispatch,
} from 'redux';

export function updateOptionValue<T extends any>(
  dispatch: Dispatch<IStoryOptionUpdateAction>,
  propName: string,
  value: T,
) {
  const action = createStoryOptionUpdateAction(propName, value);
  return dispatch(action);
}
