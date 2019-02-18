import {
  ILoadingScreenOwnProps,
} from '../components/LoadingScreen/ILoadingScreenOwnProps';
import {
  ComponentType,
} from 'react';

export interface IBeginLoadOptions {
  bodyText?: string;
  component?: ComponentType<ILoadingScreenOwnProps>;
  descriptions?: string[];
  logoPath?: string;
  progressMax?: number;
  progressStart?: number;
  title?: string;
  doneCallback?(): void;
}
