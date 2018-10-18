import {
  IPassagesAction,
} from '../IPassagesAction';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import { ActionTypes } from '../ActionTypes';

export const createPassagesAction = (passagesMap: IPassagesMap): IPassagesAction => ({
  type: ActionTypes.Passages,
  value: passagesMap,
});

export default createPassagesAction;
