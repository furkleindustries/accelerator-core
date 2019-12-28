import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';

export interface InitializationHandlerOptions {
  readonly appSelector: string;
  readonly config: IAcceleratorConfigNormalized;
  readonly loadSelector: string;
}
