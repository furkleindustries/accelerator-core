import classnames from 'classnames';;
import {
  ICardOwnProps,
} from './ICardOwnProps';
import MuiCard from '@material-ui/core/Card';
import MuiCardActions from '@material-ui/core/CardActions';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiCardMedia from '@material-ui/core/CardMedia';

import * as React from 'react';

import styles from './Card.less';

const mediaRe = /^audio|iframe|img|picture|video$/;

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
      {React.Children.map(children, (child) => (
        React.isValidElement(child) && mediaRe.test(child.type as any) ?
          <MuiCardMedia
            component={child.type as any}
            {...child.props}
            className={classnames(
              'cardMedia',
              child.props && (child.props as any).className,
            )}
          /> :
          child
      ))}
    </MuiCardContent>

    {actions ?
      <MuiCardActions
        className={classnames('cardActions')}
      >
        {actions}
      </MuiCardActions> :
      null}
  </MuiCard>
);
