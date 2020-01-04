import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';

export interface IAcceleratorConfigAware {
  readonly config: IAcceleratorConfigNormalized;
}
