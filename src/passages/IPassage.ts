import {
  IContentfulAsset,
} from '../interfaces/IContentfulAsset';
import {
  IPassageProps,
} from './IPassageProps';
import {
  ComponentType,
} from 'react';

export interface IPassage extends IContentfulAsset {
  readonly contents: ComponentType<IPassageProps>;
}
