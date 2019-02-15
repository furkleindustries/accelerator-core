import {
  IFontLoadingDetails,
} from './IFontLoadingDetails';

export function normalizeFont<T extends string | IFontLoadingDetails>(font: T): T;
