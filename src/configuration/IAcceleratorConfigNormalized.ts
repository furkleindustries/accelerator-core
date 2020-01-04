import {
  ActionTypes,
} from 'redux-undo';
import {
  IAcceleratorConfig,
} from './IAcceleratorConfig';
import {
  IFontLoadingDetailsNormalized,
} from '../fonts/IFontLoadingDetailsNormalized';
import {
  IFontSubsettingDetailsNormalized,
} from '../fonts/IFontSubsettingDetailsNormalized';

export interface IAcceleratorConfigNormalized extends IAcceleratorConfig {
  readonly fontsToLoad?: readonly IFontLoadingDetailsNormalized[];
  readonly subsetFont?: IFontSubsettingDetailsNormalized;
  readonly historySaveTypes: readonly ActionTypes[];
}
