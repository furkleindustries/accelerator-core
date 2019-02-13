import {
  ComponentType,
} from 'react';

export interface IFooter {
  readonly contents: ComponentType;
  readonly name: string;
  readonly precedence?: number;
}
