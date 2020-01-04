import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../context/IContext';
import {
  IPassageFunctions,
} from '../passages/IPassageFunctions';

export interface IPassageRendererOwnProps {
  readonly config: IAcceleratorConfigNormalized;
  readonly context: Omit<IContext, 'PassageRendererComponent'>;
  readonly passageFunctions: IPassageFunctions;
}
