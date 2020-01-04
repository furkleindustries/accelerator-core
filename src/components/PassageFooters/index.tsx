import classNames from 'classnames';
import {
  IFooter,
} from '../../passages/IFooter';
import {
  IPassageContentContainerDispatchProps,
} from '../PassageContentContainer/IPassageContentContainerDispatchProps'
import {
  IPassageFootersDispatchProps,
} from './IPassageFootersDispatchProps';
import {
  IPassageFootersOwnProps,
} from './IPassageFootersOwnProps';
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
    'There was no contents property found in the footer with name %NAME%.',
};

export const PassageFooters: React.FunctionComponent<
  IPassageFootersOwnProps & IPassageFootersDispatchProps
> = ({
  footers,
  ...passageProps
}) => (
  <div className={classNames('passageFooters')}>
    {(footers as IFooter[]).map(({ content }, index) => {
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
  IPassageFootersDispatchProps,
  {}
> = (dispatch) => ({ dispatch });

export const PassageFootersConnected = connect<
  {},
  IPassageContentContainerDispatchProps,
  IPassageFootersOwnProps
>(
  null,
  mapDispatchToProps,
)(PassageFooters);
