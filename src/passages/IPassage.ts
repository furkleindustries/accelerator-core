import {
  IPassageProps,
} from './IPassageProps';
import {
  Tag,
} from '../tags/Tag';
import {
  ComponentClass,
  SFCFactory,
} from 'react';

export interface IPassage {
  name: string;
  title?: string;
  contents?: ComponentClass<IPassageProps, any> | SFCFactory<IPassageProps>;
  tags?: Tag[];
}

export default IPassage;
