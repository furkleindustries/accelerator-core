import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  doLinkNavigation,
} from './doLinkNavigation';
import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  ILinkDispatchProps,
} from './ILinkDispatchProps';
import {
  ILinkOwnProps,
} from './ILinkOwnProps';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';

import * as React from 'react';

export const LinkUnconnected: React.FunctionComponent<
  ILinkOwnProps & ILinkDispatchProps & IButtonProps
> = ({
  children,
  className,
  dispatch,
  passageName,
  tags,
  ...props
}) => (
  <AppContextConsumerWrapper>
    {({ passagesMap }) => {
      const onClick = () => doLinkNavigation({
        dispatch,
        passageName,
        passage: passagesMap[passageName],
        tags,
      });

      return (
        <Button
          {...props}
          className={classNames(
            'link',
            className,
          )}
          onClick={onClick}
        >
          {children}
        </Button>
      );
    }}
  </AppContextConsumerWrapper>
);

export const mapDispatchToProps: MapDispatchToProps<
  ILinkDispatchProps,
  ILinkOwnProps
> = (dispatch: Dispatch) => ({ dispatch }); 

export const Link = connect(null, mapDispatchToProps)(LinkUnconnected);
