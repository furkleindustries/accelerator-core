import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IPermutationOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined[];
  readonly pick?: number;
}
