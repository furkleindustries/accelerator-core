import {
  FontStyles,
} from './FontStyles';

export interface IFontHelperVariant {
  readonly id: string;

  /* Note: comes in with single quotes around it e.g. `'Roboto'`. */
  readonly fontFamily: string;

  readonly fontStyle: FontStyles;
  readonly fontWeight: number;
  readonly local: readonly [ string, string ],

  /* URLs */
  readonly eot: string;
  readonly svg: string;
  readonly ttf: string;
  readonly woff: string;
  readonly woff2: string;
}
