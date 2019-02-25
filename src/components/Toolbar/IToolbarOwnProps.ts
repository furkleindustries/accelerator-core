import {
  ToolbarProps,
} from '@material-ui/core/Toolbar';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IToolbarOwnProps extends ToolbarProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
}
