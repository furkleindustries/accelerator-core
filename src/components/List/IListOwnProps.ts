import {
  ListProps,
} from '@material-ui/core/List';
import {
  ListItemProps,
} from '@material-ui/core/ListItem';
import {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader';
import {
  ComponentType,
  ReactElement,
} from 'react';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IListOwnProps extends ListProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly component?: ListProps['component'] | ComponentType;
  readonly dontWrapInListItem?: boolean;
  readonly listItemProps?: ListItemProps;
  readonly subheader?: ReactElement;
  readonly subheaderProps?: ListSubheaderProps;
}
