import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';

export interface ILoggersAware {
  readonly loggers: IAcceleratorConfigNormalized['loggers'];
}
