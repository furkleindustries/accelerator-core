import {
  IAsset,
} from '../interfaces/IAsset';
import {
  IPrecedenceWeighted,
} from '../interfaces/IPrecedenceWeighted';
import {
  IStoryOptionComponentOwnProps,
} from './IStoryOptionComponentOwnProps';
import {
  ComponentType,
} from 'react';

export interface IStoryOption extends IAsset, IPrecedenceWeighted {
  readonly content: ComponentType<IStoryOptionComponentOwnProps>;
  readonly optionPropName?: string | null;
}
