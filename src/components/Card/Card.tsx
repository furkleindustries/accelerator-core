import classnames from 'classnames';;
import {
  ICardOwnProps,
} from './ICardOwnProps';
import MuiCard from '@material-ui/core/Card';

import * as React from 'react';

import styles from './Card.scss';

export const Card: React.FunctionComponent<ICardOwnProps> = (props) => (
  <MuiCard {...{
    ...props,
    className: classnames(
      'card',
      styles.card,
      props.className,
    ),
  }} />
);
