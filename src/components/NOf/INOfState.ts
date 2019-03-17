import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface INOfState {
  readonly index: number;
  readonly shuffled?: ReadonlyArray<ReactNodeWithoutNullOrUndefined>;
}
