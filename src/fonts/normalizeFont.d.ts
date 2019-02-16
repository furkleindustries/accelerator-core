import {
  IFontLoadingDetails,
} from './IFontLoadingDetails';
import {
  IFontLoadingDetailsNormalized,
} from './IFontLoadingDetailsNormalized';

export function normalizeFont(
  font: IFontLoadingDetails | string,
): IFontLoadingDetailsNormalized;
