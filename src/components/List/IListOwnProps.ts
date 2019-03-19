import {
  ListProps,
} from '@material-ui/core/List';
import {
  ListItemProps,
} from '@material-ui/core/ListItem';
import {
  ListItemTextProps,
} from '@material-ui/core/ListItemText';
import {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader';
import {
  ReactElement,
} from 'react';

export interface IListOwnProps extends ListProps {
  readonly children: ReadonlyArray<any>;
  readonly listItemProps?: ListItemProps;
  readonly listItemTextProps?: ListItemTextProps;
  readonly subheader?: ReactElement;
  readonly subheaderProps?: ListSubheaderProps;
}
