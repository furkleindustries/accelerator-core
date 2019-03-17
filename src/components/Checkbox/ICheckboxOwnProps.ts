import {
  CheckboxProps,
} from '@material-ui/core/Checkbox';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ICheckboxOwnProps extends CheckboxProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
}
