import {
  ComponentClass,
  SFCFactory,
} from 'react';

export interface IHeader {
  contents: ComponentClass | SFCFactory<any>;
  name: string;
  precedence?: number;
}
