import {
  AppBarProps,
} from '@material-ui/core/AppBar';
import {
  ReactNode,
} from 'react';

export interface IAppBarOwnProps extends AppBarProps {
  readonly children: ReactNode;
}
