import {
  IFooter,
} from '../../passages/IFooter';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  IPassageContentsContainerOwnProps,
} from '../PassageContentsContainer/IPassageContentsContainerOwnProps';
import {
  IPassageContentsContainerDispatchProps,
} from '../PassageContentsContainer/IPassageContentsContainerDispatchProps';
import {
  Omit,
} from '../../typeAliases/Omit';
import {
  mapDispatchToProps,
} from '../PassageContentsContainer/PassageContentsContainer';
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
  Omit<IPassageContentsContainerOwnProps, 'passagesMap'> &
  IPassageContentsContainerDispatchProps
> = ({
  footers,
  ...passageProps
}) => (
  <div className="passageFooters">
    {footers.map(({ contents }, index) => {
      const SafeContents = assertValid<React.ComponentType<IPassageProps>>(
        contents,
        strings.COMPONENT_CONSTRUCTOR_NOT_FOUND,
      );
  
      return (
        <SafeContents
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
