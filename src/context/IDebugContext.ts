import {
  IAcceleratorDebugOptions
} from '../configuration/IAcceleratorDebugOptions';

export interface IDebugContext {
  readonly debug: boolean;
  readonly debugOptions: IAcceleratorDebugOptions;
}
