import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IClickDisappearOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly className?: string;
  readonly fadeOutDuration?: number;
}
