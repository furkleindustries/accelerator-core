import {
  IHeader,
} from '../../passages/IHeader';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  IPassageContentsContainerDispatchProps,
} from '../PassageContentsContainer/IPassageContentsContainerDispatchProps';
import {
  IPassageContentsContainerOwnProps,
} from '../PassageContentsContainer/IPassageContentsContainerOwnProps';
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

import styles from './PassageHeaders.scss';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the header with name %NAME%.',
};

export const PassageHeaders: React.FunctionComponent<
  { headers: IHeader[] } &
  Omit<IPassageContentsContainerOwnProps, 'passagesMap'> &
  IPassageContentsContainerDispatchProps
> = ({
  headers,
  ...passageProps
}) => (
  <div className={styles.passageHeaders}>
    {headers.map(({ contents }, index) => {
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

export const PassageHeadersConnected = connect(
  null,
  mapDispatchToProps,
)(PassageHeaders);
