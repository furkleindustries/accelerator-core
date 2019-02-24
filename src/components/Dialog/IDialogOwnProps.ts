import {
  DialogProps,
} from '@material-ui/core/Dialog';
import {
  ReactNode,
} from 'react';
import {
  DialogTitleProps,
} from '@material-ui/core/DialogTitle';

export interface IDialogOwnProps extends DialogProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly dialogActions?: ReactNode;
  readonly includeTitle?: string | DialogTitleProps;
}
