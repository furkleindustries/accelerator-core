import classnames from 'classnames';;
import {
  ICardOwnProps,
} from './ICardOwnProps';
import MuiCard from '@material-ui/core/Card';
import MuiCardActions from '@material-ui/core/CardActions';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiCardHeader from '@material-ui/core/CardHeader';

import * as React from 'react';

import styles from './Card.scss';

export const Card: React.FunctionComponent<ICardOwnProps> = ({
  actions,
  children,
  className,
  header,
  headerTypographyProps = { variant: 'headline' },
  subheader,
  subheaderTypographyProps = { variant: 'subheading' },
  ...props
}) => (
  <MuiCard 
    {...props}
    className={classnames(
      'card',
      styles.card,
      className,
    )}
  >
    {header ?
      <MuiCardHeader
        className={classnames(styles.header, 'cardHeader')}
        subheader={subheader}
        subheaderTypographyProps={subheaderTypographyProps}
        title={header}
        titleTypographyProps={headerTypographyProps}
      /> :
      null}

    <MuiCardContent className={classnames(styles.content, 'cardContent')}>
      {children}
    </MuiCardContent>

    {actions ?
      <MuiCardActions
        className={classnames(styles.actions, 'cardActions')}
      >
        {actions}
      </MuiCardActions> :
      null}
  </MuiCard>
);
