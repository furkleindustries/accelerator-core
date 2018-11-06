import {
  ComponentClass,
  SFCFactory,
} from 'react';

export interface IFooter {
  contents: ComponentClass | SFCFactory<any>;
  name: string;
  precedence?: number;
}
