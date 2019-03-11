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
  readonly historySaveTypes:
    ActionTypes |
    ReadonlyArray<ActionTypes> |
    string |
    ReadonlyArray<string>;
  readonly historySynchronizeUnrewindableStateWithPresent: boolean;
  readonly publicUrl: string;
  readonly rendererName: BuiltInRenderers | string;
  readonly showMenu: boolean;
  readonly storyDescription: string;
  readonly storyTitle: string;
  readonly fontsToLoad?: ReadonlyArray<IFontLoadingDetails | string>;
  readonly subsetFont?: IFontSubsettingDetails | string;
}
