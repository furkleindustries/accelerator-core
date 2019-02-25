import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IFadeInOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly className?: string;
  readonly duration: number;
}
