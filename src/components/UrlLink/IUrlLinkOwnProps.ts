import {
  LinkProps,
} from '@material-ui/core/Link';
import {
  ReactNode,
} from 'react';

export interface IUrlLinkOwnProps extends LinkProps {
  readonly children: ReactNode;
}
