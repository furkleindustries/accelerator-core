import {
  IFontSubsettingDetails,
} from './IFontSubsettingDetails';
import {
  IFontSubsettingDetailsNormalized,
} from './IFontSubsettingDetailsNormalized';

export function normalizeFontSubset(
  subset: string | IFontSubsettingDetails,
): IFontSubsettingDetailsNormalized;
