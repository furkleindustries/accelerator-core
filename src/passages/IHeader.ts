import {
  IPassageProps,
} from './IPassageProps';
import {
  ComponentClass,
  SFC,
} from 'react';

export interface IHeader {
  contents: ComponentClass<IPassageProps> | SFC<IPassageProps>;
  name: string;
  precedence?: number;
}
