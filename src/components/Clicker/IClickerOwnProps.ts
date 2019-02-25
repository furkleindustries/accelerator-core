import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IClickerOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly contentAfterClick: ReactNodeWithoutNullOrUndefined;
  readonly className?: string;
}
