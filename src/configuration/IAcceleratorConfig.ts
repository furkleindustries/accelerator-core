import {
  ActionTypes
} from '../actions/ActionTypes';

export interface IAcceleratorConfig {
  readonly [key: string]: any;
  readonly debug: boolean;
  readonly historyStackLimit: number;
  readonly historySaveTypes: ActionTypes | ActionTypes[] | string | string[];
  readonly historySynchronizeUnrewindableStateWithPresent: boolean;
  readonly publicUrl: string;
  readonly storyDescription: string;
  readonly storyTitle: string;
}
