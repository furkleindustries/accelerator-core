import * as config from '../../accelerator.config';
import {
  defaults,
} from './defaults';
import {
  IAcceleratorConfig,
} from './IAcceleratorConfig';

let memoized: IAcceleratorConfig | null = null;
export function getAcceleratorConfig(): IAcceleratorConfig {
  memoized = memoized || Object.freeze({ ...defaults, ...config, });
  return memoized;
}
