import {
  ListProps,
} from '@material-ui/core/List';
import {
  ReactElement,
} from 'react';

export interface IListOwnProps extends ListProps {
  readonly children: ReadonlyArray<any>;
  readonly listItemProps?: Record<string, any>;
  readonly listItemTextProps?: Record<string, any>;
  readonly subheader?: ReactElement;
  readonly subheaderProps?: Record<string, any>;
}
