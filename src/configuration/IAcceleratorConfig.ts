import {
  ActionTypes
} from '../actions/ActionTypes';
import {
  BuiltInRenderers,
} from '../renderers/BuiltInRenderers';
import {
  IFontLoadingDetails,
} from '../fonts/IFontLoadingDetails';
import {
  IFontSubsettingDetails,
} from '../fonts/IFontSubsettingDetails';

export interface IAcceleratorConfig {
  readonly [key: string]: any;
  readonly debug: boolean;
  readonly historyStackLimit: number;
  readonly historySaveTypes: ActionTypes | ActionTypes[] | string | string[];
  readonly historySynchronizeUnrewindableStateWithPresent: boolean;
  readonly publicUrl: string;
  readonly rendererName: BuiltInRenderers | string;
  readonly storyDescription: string;
  readonly storyTitle: string;
  readonly fontsToLoad?: Array<IFontLoadingDetails | string>;
  readonly subsetFont?: IFontSubsettingDetails | string;
}
