import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IFadeOutOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly duration: number;
  readonly className?: string;
}
