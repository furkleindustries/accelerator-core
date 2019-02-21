import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';

export interface InitializationHandlerOptions {
  appSelector: string;
  config: IAcceleratorConfigNormalized;
  loadSelector: string;
}
