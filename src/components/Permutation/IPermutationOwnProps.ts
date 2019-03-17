import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IPermutationOwnProps {
  readonly children: ReadonlyArray<ReactNodeWithoutNullOrUndefined>;
  readonly pick?: number;
}
