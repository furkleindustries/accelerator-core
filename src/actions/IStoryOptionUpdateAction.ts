import {
  ActionTypes,
} from './ActionTypes';

export interface IStoryOptionUpdateAction<T extends any = any> {
  readonly type: ActionTypes.StoryOptionUpdate;
  readonly propName: string;
  readonly value: T;
}
