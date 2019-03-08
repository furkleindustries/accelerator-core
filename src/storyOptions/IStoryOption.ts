import {
  IAsset,
} from '../interfaces/IAsset';
import {
  IStoryOptionComponentOwnProps,
} from './IStoryOptionComponentOwnProps';
import {
  ComponentType,
} from 'react';

export interface IStoryOption extends IAsset {
  readonly content: ComponentType<IStoryOptionComponentOwnProps>;
}
