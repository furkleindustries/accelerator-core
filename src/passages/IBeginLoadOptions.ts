import {
  ILoadingScreenOwnProps,
} from '../components/LoadingScreen/ILoadingScreenOwnProps';
import {
  ComponentClass,
  SFC,
} from 'react';

export interface IBeginLoadOptions {
  component?: ComponentClass<ILoadingScreenOwnProps> | SFC<ILoadingScreenOwnProps>,
  logoPath?: string,
  title?: string,
}
