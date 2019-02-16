import {
  IAcceleratorConfig,
} from './IAcceleratorConfig';
import {
  IFontLoadingDetails,
} from '../fonts/IFontLoadingDetails';
import {
  IFontSubsettingDetails,
} from '../fonts/IFontSubsettingDetails';

export interface IAcceleratorConfigNormalized extends IAcceleratorConfig {
  readonly fontsToLoad?: Array<IFontLoadingDetails>;
  readonly subsetFont?: IFontSubsettingDetails;
}
