import {
  ActionTypes,
} from '../ActionTypes';
import {
  ICurrentPassageAction,
} from '../ICurrentPassageAction';
import {
  IPassage,
} from '../../passages/IPassage';

export function createCurrentPassageAction(passage: IPassage): ICurrentPassageAction {
  return {
    type: ActionTypes.CurrentPassage,
    value: name,
  };
}
