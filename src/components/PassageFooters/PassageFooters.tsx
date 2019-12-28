import classNames from 'classnames';
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
  { readonly footers: ReadonlyArray<IFooter> } &
  IPassageContentContainerOwnProps &
  IPassageContentContainerDispatchProps
> = ({
  footers,
  ...passageProps
}) => (
  <div className={classNames('passageFooters')}>
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
