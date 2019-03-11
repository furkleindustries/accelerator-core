import {
  ILoadingScreenOwnProps,
} from '../components/LoadingScreen/ILoadingScreenOwnProps';
import {
  ComponentType,
} from 'react';

export interface IBeginLoadOptions {
  readonly bodyText?: string;
  readonly component?: ComponentType<ILoadingScreenOwnProps>;
  readonly descriptions?: ReadonlyArray<string>;
  readonly logoPath?: string;
  readonly progressMax?: number;
  readonly progressStart?: number;
  readonly title?: string;
  doneCallback?(): void;
}
