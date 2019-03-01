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
  Omit,
} from '../typeAliases/Omit';
import {
  ReactElement,
} from 'react';

export interface IPassageRenderer {
  readonly config: Omit<IAcceleratorConfigNormalized, 'pathToRenderer'>;
  readonly context: Omit<IContext, 'renderer'>;
  render(...args: any[]): ReactElement<IPassageProps>;
}
