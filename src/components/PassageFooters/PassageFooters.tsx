import classnames from 'classnames';
import {
  IFooter,
} from '../../passages/IFooter';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  IPassageContentContainerOwnProps,
} from '../PassageContentContainer/IPassageContentContainerOwnProps';
import {
  IPassageContentContainerDispatchProps,
} from '../PassageContentContainer/IPassageContentContainerDispatchProps';
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
    'There was no contents property found in the footer with name %NAME%.',
};

export const PassageFooters: React.FunctionComponent<
  { footers: IFooter[] } &
  Omit<IPassageContentContainerOwnProps, 'passagesMap'> &
  IPassageContentContainerDispatchProps
> = ({
  footers,
  ...passageProps
}) => (
  <div className={classnames('passageFooters')}>
    {footers.map(({ content }, index) => {
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

export const PassageFootersConnected = connect(
  null,
  mapDispatchToProps,
)(PassageFooters);
