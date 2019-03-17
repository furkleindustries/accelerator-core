import classnames from 'classnames';
import {
  IHeader,
} from '../../passages/IHeader';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  IPassageContentContainerDispatchProps,
} from '../PassageContentContainer/IPassageContentContainerDispatchProps';
import {
  IPassageContentContainerOwnProps,
} from '../PassageContentContainer/IPassageContentContainerOwnProps';
import {
  Omit,
} from '../../typeAliases/Omit';
import {
  mapDispatchToProps,
} from '../PassageContentContainer/PassageContentContainer';
import {
  connect,
} from 'react-redux';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the header with name %NAME%.',
};

export const PassageHeaders: React.FunctionComponent<
  { readonly headers: ReadonlyArray<IHeader> } &
  Omit<IPassageContentContainerOwnProps, 'passagesMap'> &
  IPassageContentContainerDispatchProps
> = ({
  headers,
  ...passageProps
}) => (
  <div className={classnames('passageHeaders')}>
    {headers.map(({ content }, index) => {
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

export const PassageHeadersConnected = connect(
  null,
  mapDispatchToProps,
)(PassageHeaders);
