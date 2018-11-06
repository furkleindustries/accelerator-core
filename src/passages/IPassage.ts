import {
  Tag,
} from '../tags/Tag';
import {
  ComponentClass,
  SFCFactory,
} from 'react';

export interface IPassage {
  readonly name: string;
  readonly title?: string;
  readonly contents?: ComponentClass | SFCFactory<any>;
  readonly tags?: Tag[];
}
