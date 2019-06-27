import {
  Button,
} from '../Button/Button';
import classnames from 'classnames';
import {
  doLinkNavigation,
} from './doLinkNavigation';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
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

const {
  Consumer: PassagesMapAndStartPassageNameConsumer,
} = getPassagesMapAndStartPassageNameContext();

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
  <PassagesMapAndStartPassageNameConsumer>
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
          className={classnames(
            'link',
            className,
          )}
          onClick={onClick}
        >
          {children}
        </Button>
      );
    }}
  </PassagesMapAndStartPassageNameConsumer>
);

export const mapDispatchToProps: MapDispatchToProps<
  ILinkDispatchProps,
  ILinkOwnProps
> = (dispatch: Dispatch) => ({ dispatch }); 

export const Link = connect(null, mapDispatchToProps)(LinkUnconnected);
