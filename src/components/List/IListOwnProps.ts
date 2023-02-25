import type {
  ListProps,
} from '@material-ui/core/List';
import type {
  ListItemProps,
} from '@material-ui/core/ListItem';
import type {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader';
import type {
  ReactElement,
} from 'react';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IListOwnProps extends ListProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly dontWrapInListItem?: boolean;
  readonly listItemProps?: ListItemProps;
  readonly ordered?: boolean;
  readonly subheader?: ReactElement;
  readonly subheaderProps?: ListSubheaderProps;
}
