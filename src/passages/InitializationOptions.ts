import {
  IBeginLoadOptions,
} from './IBeginLoadOptions';
import {
  ILoadingScreenOwnProps,
} from '../components/LoadingScreen/ILoadingScreenOwnProps';
import {
  ComponentClass,
  SFC,
} from 'react';

export interface InitializationOptions {
  readonly component?: ComponentClass<ILoadingScreenOwnProps> | SFC<ILoadingScreenOwnProps>;
  addProgressTicks(ticks: number): void;
  beginLoad(options?: IBeginLoadOptions): void;
  setProgressMax(max: number): void;
  setProgressStart(start: number): void;
}
