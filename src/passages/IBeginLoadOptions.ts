import {
  IAcceleratorConfigAware,
} from '../interfaces/IAcceleratorConfigAware';
import {
  ILoadingScreenOwnProps,
} from '../components/LoadingScreen/ILoadingScreenOwnProps';
import type {
  ComponentType,
} from 'react';

export interface IBeginLoadOptions extends IAcceleratorConfigAware {
  readonly bodyText?: string;
  readonly component?: ComponentType<ILoadingScreenOwnProps>;
  readonly doneCallback?: () => void;
  readonly initialDescription?: string;
  readonly fadeOutDuration?: number;
  readonly logoPath?: string;
  readonly progressMax?: number;
  readonly title?: string;
}
