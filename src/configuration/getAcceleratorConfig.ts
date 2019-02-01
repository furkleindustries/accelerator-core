import {
  config,
} from '../../accelerator.config';
import {
  defaults,
} from './defaults';
import {
  IAcceleratorConfig,
} from './IAcceleratorConfig';

let memoized: IAcceleratorConfig | null = null;
export function getAcceleratorConfig() {
  if (!memoized) {
    memoized = {
      ...defaults,
      ...config,
    };
  }

  return memoized;
}
