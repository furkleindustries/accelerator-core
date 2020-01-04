import {
  MaybeReadonlyArray,
} from './MaybeReadonlyArray';

export type OneOrMaybeReadonlyArray<T extends any = any> =
  T | MaybeReadonlyArray<T>;
