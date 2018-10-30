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
  contents?: ComponentClass | SFCFactory<any>;
  tags?: Tag[];
}

export default IPassage;
