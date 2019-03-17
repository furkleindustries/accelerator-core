import {
  IFontHelper,
} from './IFontHelper';
import {
  IFontLoadingDetailsNormalized,
} from './IFontLoadingDetailsNormalized';

export function getFontFaceRules(
  directory: string,
  fontLoadingObj: IFontLoadingDetailsNormalized,
  fontHelper: IFontHelper,
): string[];
