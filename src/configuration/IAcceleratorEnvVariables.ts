import { ActionTypes } from '../actions/ActionTypes';

type HistorySaveTypes =
  ActionTypes.Bookmark |
  ActionTypes.PassageNavigation |
  ActionTypes.StoryState;

export interface IAcceleratorEnvVariables {
  readonly [key: string]: any;
  readonly debug: boolean;
  readonly history_stack_limit: number;
  readonly history_save_types: 'all' | HistorySaveTypes | HistorySaveTypes[];
  readonly story_description: string;
  readonly story_title: string;
}
