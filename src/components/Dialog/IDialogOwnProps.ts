import {
  DialogActionsProps,
} from '@material-ui/core/DialogActions';
import {
  DialogProps,
} from '@material-ui/core/Dialog';
import {
  DialogTitleProps,
} from '@material-ui/core/DialogTitle';

export interface IDialogOwnProps extends DialogProps {
  readonly dialogActions?: DialogActionsProps['children'];
  readonly includeTitle?: string | DialogTitleProps['children'];
}
