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
  IButtonOwnProps,
} from '../Button/IButtonOwnProps';
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

import builtInStyles from '../../../passages/_global-styles/components/index.less';

export const LinkUnconnected: React.FC<
  ILinkOwnProps & ILinkDispatchProps & IButtonOwnProps
> = ({
  children,
  className,
  dispatch,
  passageName,
  role,
  tags,
  ...props
}) => (
  <AppContextConsumerWrapper>
    {({ passagesMap }) => {
      const onClick = () => doLinkNavigation({
        dispatch,
        passageName,
        passageObject: passagesMap[passageName],
        tags,
      });

      return (
        <Button
          {...props}

          className={classNames(
            builtInStyles['link'],
            'link',
            'choice',
            className,
          )}

          role={role || 'link'}
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
