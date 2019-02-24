import {
  TypographyProps,
} from '@material-ui/core/Typography';
import {
  ReactNode,
} from 'react';

export interface ITypographyOwnProps extends TypographyProps {
  readonly children: ReactNode;
}
