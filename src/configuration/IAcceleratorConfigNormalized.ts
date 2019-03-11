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
  readonly fontsToLoad?: ReadonlyArray<IFontLoadingDetailsNormalized>;
  readonly subsetFont?: IFontSubsettingDetailsNormalized;
}
