import {
  IPassageProps,
} from './IPassageProps';
import {
  ComponentType,
} from 'react';

export interface IHeader {
  readonly contents: ComponentType<IPassageProps>;
  readonly name: string;
  readonly precedence?: number;
}
