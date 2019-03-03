import {
  BuiltInTags,
} from '../../tags/BuiltInTags';
import {
  getTag,
} from '../../tags/getTag';
import {
  IAction,
} from '../../actions/IAction';
import {
  IPassageContentsContainerDispatchProps,
} from './IPassageContentsContainerDispatchProps';
import {
  IPassageContentsContainerOwnProps,
} from './IPassageContentsContainerOwnProps';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
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

export const PassageContentsContainer: React.FunctionComponent<
  IPassageContentsContainerOwnProps &
  IPassageContentsContainerDispatchProps
> = ({
  passageObject,
  passageObject: {
    contents,
    tags,
  },
  ...passageProps
}) => {
  const SafeContents = assertValid<React.ComponentType<IPassageProps>>(
    contents,
    strings.COMPONENT_NOT_FOUND,
  );

  assert(
    Array.isArray(tags) && !getTag(tags, BuiltInTags.NoRender),
    strings.CANT_RENDER_NORENDER_PASSAGE,
  );

  return (
    <SafeContents
      passageObject={passageObject}
      {...passageProps}
    />
  );
};

export const mapDispatchToProps: MapDispatchToProps<
  IPassageContentsContainerDispatchProps,
  null
> = (
  dispatch: Dispatch<IAction>,
) => ({ dispatch });

export const PassageContentsContainerConnected = connect(
  null,
  mapDispatchToProps,
)(PassageContentsContainer);
