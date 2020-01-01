import {
  ILoadingScreenOwnProps,
} from '../components/LoadingScreen';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';
import {
  ComponentType,
} from 'react';

export interface IBeginLoadOptions {
  readonly bodyText?: string;
  readonly component?: ComponentType<ILoadingScreenOwnProps>;
  readonly descriptions?: MaybeReadonlyArray<string>;
  readonly logoPath?: string;
  readonly progressMax?: number;
  readonly progressStart?: number;
  readonly title?: string;
  readonly doneCallback?: () => void;
}
