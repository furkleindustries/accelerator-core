import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryOptionUpdateAction,
} from '../IStoryOptionUpdateAction';

export function createStoryOptionUpdateAction<T extends any>(
  propName: string,
  value: T,
) {
  return Object.freeze({
    propName,
    value,
    type: ActionTypes.StoryOptionUpdate,
  }) as IStoryOptionUpdateAction;
}
