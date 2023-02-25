import classNames from 'classnames';
import {
  ICardOwnProps,
} from './ICardOwnProps';
import MuiCard from '@material-ui/core/Card';
import MuiCardActions from '@material-ui/core/CardActions';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiCardMedia from '@material-ui/core/CardMedia';

import * as React from 'react';

const mediaRe = /^audio|iframe|img|picture|video$/;

export const Card: React.FC<ICardOwnProps> = ({
  actions,
  children,
  className,
  header,
  headerTypographyProps = { variant: 'h3' },
  subheader,
  subheaderTypographyProps = { variant: 'h4' },
  ...props
}) => (
  <MuiCard 
    {...props}
    className={classNames(
      'card',
      className,
    )}
  >
    {header ?
      <MuiCardHeader
        className={classNames('card-header')}
        subheader={subheader}
        subheaderTypographyProps={subheaderTypographyProps}
        title={header}
        titleTypographyProps={headerTypographyProps}
      /> :
      null}

    <MuiCardContent className={classNames('card-content')}>
      {React.Children.map(children, (child) => (
        React.isValidElement(child) && mediaRe.test(child.type as any) ?
          <MuiCardMedia
            component={child.type as any}
            {...child.props}
            className={classNames(
              'card-media',
              child.props && (child.props as any).className,
            )}
          /> :
          child
      ))}
    </MuiCardContent>

    {actions ?
      <MuiCardActions className={classNames('card-actions')}>
        {actions}
      </MuiCardActions> :
      null}
  </MuiCard>
);
