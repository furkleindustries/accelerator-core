import {
  getCssMinimizer,
} from './getCssMinimizer';
import {
  getJavaScriptMinimizer,
} from './getJavaScriptMinimizer';

export const getMinimizers = (shouldUseSourceMap) => [
  getCssMinimizer(shouldUseSourceMap),
  getJavaScriptMinimizer(shouldUseSourceMap),
];
