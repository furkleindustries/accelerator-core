import {
  IFontHelper,
} from './IFontHelper';
import {
  IFontLoadingDetails,
} from './IFontLoadingDetails';

export function getFontFaceRules(
  fontLoadingObj: IFontLoadingDetails,
  fontHelper: IFontHelper,
): string[];
