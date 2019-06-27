import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface INOfOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined[];
  readonly n: number;
  readonly shuffle?: boolean;
}
