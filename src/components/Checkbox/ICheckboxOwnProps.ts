import {
  CheckboxProps,
} from '@material-ui/core/Checkbox';
import {
  ReactNode,
} from 'react';

export interface ICheckboxOwnProps extends CheckboxProps {
  readonly children: ReactNode;
  readonly className?: string;
}
