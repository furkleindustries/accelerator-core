import {
  ActionTypes
} from '../actions/ActionTypes';

export interface IAcceleratorConfig {
  readonly [key: string]: any;
  readonly debug: boolean;
  readonly fontsToLoad: string[];
  readonly historyStackLimit: number;
  readonly historySaveTypes: ActionTypes | ActionTypes[] | string | string[];
  readonly historySynchronizeUnrewindableStateWithPresent: boolean;
  readonly publicUrl: string;
  readonly showLoadingScreen: boolean;
  readonly storyDescription: string;
  readonly storyTitle: string;
  readonly subsetFont?: string;
}
