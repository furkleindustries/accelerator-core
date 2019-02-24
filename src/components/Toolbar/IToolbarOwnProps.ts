import {
  ToolbarProps,
} from '@material-ui/core/Toolbar';
import {
  ReactNode,
} from 'react';

export interface IToolbarOwnProps extends ToolbarProps {
  readonly children: ReactNode;
}
