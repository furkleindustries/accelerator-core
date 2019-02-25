import {
  ButtonProps,
} from '@material-ui/core/Button';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IButtonProps extends ButtonProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
}
