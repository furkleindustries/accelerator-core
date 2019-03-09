import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IRestartButtonOwnProps extends IButtonProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
}
