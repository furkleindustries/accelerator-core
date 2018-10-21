import {
  ReactElement,
} from 'react';
import {
  Tag,
} from '../tags/Tag';

import * as React from 'react';

export interface IPassage {
  name: string;
  title?: string;
  contents?: React.ComponentClass | ReactElement<any>;
  tags?: Tag[];
}

export default IPassage;
