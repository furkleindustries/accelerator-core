import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface INOfOwnProps {
  readonly children: ReadonlyArray<ReactNodeWithoutNullOrUndefined>;
  readonly n: number;
  readonly shuffle?: boolean;
}
