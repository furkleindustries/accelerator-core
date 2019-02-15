import {
  IFontLoadingDetails,
} from './IFontLoadingDetails';
import {
  IFontHelper,
} from './IFontHelper';

export function downloadFontFiles(
  fontLoadingObj: IFontLoadingDetails,
  helper: IFontHelper,
  downloadDirectory: string,
): Promise<string>;
