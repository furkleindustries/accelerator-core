import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../context/IContext';
import {
  IPassageProps,
} from '../passages/IPassageProps';
import {
  IPassageRenderer,
} from './IPassageRenderer';
import {
  Omit,
} from '../typeAliases/Omit';
import {
  ReactElement,
} from 'react';

export class SinglePassageRenderer implements IPassageRenderer {
  readonly config: Omit<IAcceleratorConfigNormalized, 'renderer'>;
  readonly context: IContext;
  render(...args: any[]): ReactElement<IPassageProps>;
}
