import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../context/IContext';
import {
  IPassageFunctions,
} from '../passages/IPassageFunctions';
import {
  IPassageProps,
} from '../passages/IPassageProps';
 import {
  Omit,
} from '../typeAliases/Omit';
import {
  ReactElement,
  ReactFragment,
} from 'react';

export interface IPassageRenderer {
  readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  readonly context: Omit<IContext, 'PassageRendererConstructor'>;
  readonly passageFunctions: IPassageFunctions;
  render(...args: any[]): ReactElement<IPassageProps> | ReactFragment;
}
