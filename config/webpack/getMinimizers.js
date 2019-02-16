import {
  getCssMinimizer,
} from './getCssMinimizer';
import {
  getJavaScriptMinimizer,
} from './getJavaScriptMinimizer';

export function getMinimizers(shouldUseSourceMap) {
  return [
    getCssMinimizer(shouldUseSourceMap),
    getJavaScriptMinimizer(shouldUseSourceMap),
  ];
}
