import {
  ActionTypes
} from '../actions/ActionTypes';

export interface IAcceleratorEnvVariables {
  readonly [key: string]: any;
  readonly debug: boolean;
  readonly history_stack_limit: number;
  readonly history_save_types: ActionTypes | ActionTypes[] | string | string[];
  readonly story_description: string;
  readonly story_title: string;
}
