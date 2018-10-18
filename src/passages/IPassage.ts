import {
  ReactElement,
} from 'react';
import {
  Tag,
} from '../tags/Tag';

export interface IPassage {
  name: string;
  title?: string;
  contents: ReactElement<any>;
  tags?: Tag[];
}

export default IPassage;
