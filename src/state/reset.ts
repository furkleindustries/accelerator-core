import {
  createCurrentPassageNameAction,
} from '../actions/creators/createCurrentPassageNameAction';
import {
  createStoryResetAction,
} from '../actions/creators/createStoryResetAction';
import {
  IAction,
} from '../actions/IAction';
import {
  Dispatch,
} from 'redux';

export const reset = (dispatch: Dispatch<IAction>, startPassageName: string) => {
  dispatch(createStoryResetAction());
  dispatch(createCurrentPassageNameAction(startPassageName));
};

export default reset;
