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
  Omit,
} from '../typeAliases/Omit';

export interface IPassageRendererOwnProps {
  readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  readonly context: Omit<IContext, 'PassageRendererComponent'>;
  readonly passageFunctions: IPassageFunctions;
}
