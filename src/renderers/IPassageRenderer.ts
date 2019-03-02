import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../context/IContext';
 import {
  Omit,
} from '../typeAliases/Omit';
import {
  ReactNode,
} from 'react';

export interface IPassageRenderer {
  readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  readonly context: Omit<IContext, 'PassageRendererConstructor'>;
  render(...args: any[]): ReactNode;
}
