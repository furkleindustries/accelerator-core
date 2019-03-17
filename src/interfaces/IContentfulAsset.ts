import {
  IAsset,
} from './IAsset';
import {
  ComponentType,
} from 'react';

export interface IContentfulAsset<T extends object> extends IAsset {
  readonly content: ComponentType<T>;
}
