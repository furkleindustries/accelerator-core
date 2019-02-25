import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IClickPrependOwnProps {
  readonly toPrepend: ReactNodeWithoutNullOrUndefined;
  readonly className?: string;
}
