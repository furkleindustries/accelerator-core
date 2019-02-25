import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IDelayOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly timeout: number;
  readonly className?: string;
  readonly renderWithZeroOpacity?: boolean;
}
