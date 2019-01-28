import {
  Tag,
} from '../tags/Tag';
import {
  IPassageProps,
} from './IPassageProps';
import {
  ComponentClass,
  SFC,
} from 'react';

export interface IPassage {
  readonly contents: ComponentClass<IPassageProps> | SFC<IPassageProps>;
  readonly name: string;
  readonly title?: string;
  readonly tags?: Tag[];
}
