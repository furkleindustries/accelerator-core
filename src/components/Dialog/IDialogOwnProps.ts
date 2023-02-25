import type {
  DialogActionsProps,
} from '@material-ui/core/DialogActions';
import type {
  DialogProps,
} from '@material-ui/core/Dialog';
import type {
  DialogTitleProps,
} from '@material-ui/core/DialogTitle';

export interface IDialogOwnProps extends DialogProps {
  readonly dialogActions?: DialogActionsProps['children'];
  readonly includeTitle?: string | DialogTitleProps['children'];
}
