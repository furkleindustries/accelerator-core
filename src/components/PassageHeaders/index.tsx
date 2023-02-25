import classNames from 'classnames';
import {
  IHeader,
} from '../../passages/IHeader';
import {
  IPassageContentContainerDispatchProps,
} from '../PassageContentContainer/IPassageContentContainerDispatchProps'
import {
  IPassageHeadersDispatchProps,
} from './IPassageHeadersDispatchProps';
import {
  IPassageHeadersOwnProps,
} from './IPassageHeadersOwnProps';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the header with name %NAME%.',
};

export const PassageHeaders: React.FC<
  IPassageHeadersOwnProps & IPassageHeadersDispatchProps
> = ({
  headers,
  ...passageProps
}) => (
  <div
    className={classNames('passage-headers')}
    role="group"
  >
    {(headers as IHeader[]).map(({ content }, index) => {
      const SafeContent = assertValid<React.ComponentType<IPassageProps>>(
        content,
        strings.COMPONENT_CONSTRUCTOR_NOT_FOUND,
      );

      return (
        <SafeContent
          key={index}
          {...passageProps}
        />
      );
    })}
  </div>
);

export const mapDispatchToProps: MapDispatchToProps<
  IPassageHeadersDispatchProps,
  {}
> = (dispatch) => ({ dispatch });

export const PassageHeadersConnected = connect<
  {},
  IPassageContentContainerDispatchProps,
  IPassageHeadersOwnProps
>(
  null,
  mapDispatchToProps,
)(PassageHeaders);
