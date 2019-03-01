import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../context/IContext';
import {
  IPassageRenderer,
} from './IPassageRenderer';
import {
  Omit,
} from '../typeAliases/Omit';

export interface IPassageRendererConstructor {
  new (
    config: Omit<IAcceleratorConfigNormalized, 'rendererName'> ,
    context: Omit<IContext, 'PassageRendererConstructor'>,
    ...args: any[]
  ): IPassageRenderer;
}
