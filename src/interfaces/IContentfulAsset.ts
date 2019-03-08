import {
  IAsset,
} from './IAsset';
import {
  ComponentType,
} from 'react';

export interface IContentfulAsset extends IAsset {
  readonly contents: ComponentType;
}
