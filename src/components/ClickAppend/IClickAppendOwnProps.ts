import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IClickAppendOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly toAppend: ReactNodeWithoutNullOrUndefined;
  readonly className?: string;
}
