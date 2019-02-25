import {
  DialogProps,
} from '@material-ui/core/Dialog';
import {
  DialogTitleProps,
} from '@material-ui/core/DialogTitle';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IDialogOwnProps extends DialogProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly dialogActions?: ReactNodeWithoutNullOrUndefined;
  readonly includeTitle?: string | DialogTitleProps;
}
