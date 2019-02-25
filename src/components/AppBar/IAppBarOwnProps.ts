import {
  AppBarProps,
} from '@material-ui/core/AppBar';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IAppBarOwnProps extends AppBarProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
}
