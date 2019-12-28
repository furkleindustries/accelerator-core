import {
  BuiltInTags,
} from '../../tags/BuiltInTags';
import {
  getTag,
} from '../../tags/getTag';
import {
  IPassageContentContainerDispatchProps,
} from './IPassageContentContainerDispatchProps';
import {
  IPassageContentContainerOwnProps,
} from './IPassageContentContainerOwnProps';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  assert,
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  COMPONENT_NOT_FOUND:
    'The contents property of the passage object passed to PassageContainer ' +
    'was not found.',

  CANT_RENDER_NORENDER_PASSAGE:
    'A passage with the tag "noRender" was passed to PassageContainer. ' +
    'These passages cannot be rendered and should be used solely for ' +
    'exporting reusable content.',

  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
};

export const PassageContentContainer: React.FunctionComponent<
  IPassageContentContainerOwnProps &
  IPassageContentContainerDispatchProps
> = ({
  passageObject,
  passageObject: {
    content,
    tags,
  },

  ...passageProps
}) => {
  const SafeContent = assertValid<React.ComponentType<IPassageProps>>(
    content,
    strings.COMPONENT_NOT_FOUND,
  );

  assert(
    Array.isArray(tags) && !getTag(tags, BuiltInTags.NoRender),
    strings.CANT_RENDER_NORENDER_PASSAGE,
  );

  return (
    <SafeContent
      passageObject={passageObject}
      {...passageProps}
    />
  );
};

export const mapDispatchToProps: MapDispatchToProps<
  IPassageContentContainerDispatchProps,
  null
> = (dispatch) => ({ dispatch });

export const PassageContentContainerConnected = connect(
  null,
  mapDispatchToProps,
)(PassageContentContainer);
