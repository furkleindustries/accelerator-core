import {
  Tag,
} from '../tags/Tag';
import {
  IPassageProps,
} from './IPassageProps';
import {
  ComponentType,
} from 'react';

export interface IPassage {
  readonly contents: ComponentType<IPassageProps>;
  readonly name: string;
  readonly title?: string;
  readonly tags?: Tag[];
}
