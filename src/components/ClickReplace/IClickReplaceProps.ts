import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IClickReplaceOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly replaceWith: ReactNodeWithoutNullOrUndefined;
  readonly className?: string;
}
