import {
  LinkProps,
} from '@material-ui/core/Link';
import type {
  ReactNode,
} from 'react';

export interface IUrlLinkOwnProps extends LinkProps {
  readonly children?: ReactNode;
}
