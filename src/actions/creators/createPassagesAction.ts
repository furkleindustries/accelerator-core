import {
  ActionTypes,
} from '../ActionTypes';
import {
  IPassagesAction,
} from '../IPassagesAction';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';

export const createPassagesAction = (passagesMap: IPassagesMap): IPassagesAction => ({
  type: ActionTypes.Passages,
  value: passagesMap,
});

export default createPassagesAction;
