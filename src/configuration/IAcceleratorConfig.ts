import {
  ActionTypes
} from '../actions/ActionTypes';
import {
  IFontLoadingDetails,
} from '../fonts/IFontLoadingDetails';
import {
  IFontSubsettingDetails,
} from '../fonts/IFontSubsettingDetails';
import {
  IPassageRenderer,
} from '../passages/renderers/IPassageRenderer';

export interface IAcceleratorConfig {
  readonly [key: string]: any;
  readonly debug: boolean;
  readonly historyStackLimit: number;
  readonly historySaveTypes: ActionTypes | ActionTypes[] | string | string[];
  readonly historySynchronizeUnrewindableStateWithPresent: boolean;
  readonly publicUrl: string;
  readonly renderer: IPassageRenderer;
  readonly showLoadingScreen: boolean;
  readonly storyDescription: string;
  readonly storyTitle: string;
  readonly fontsToLoad?: Array<IFontLoadingDetails | string>;
  readonly subsetFont?: IFontSubsettingDetails | string;
}
