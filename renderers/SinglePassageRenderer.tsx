import {
  IPassageRendererOwnProps,
} from '../src/renderers/IPassageRendererOwnProps';
import {
  PassageContainer,
} from '../src/components/PassageContainer';
import {
  SkipToContentLinkDestination,
} from '../src/components/SkipToContentLinkDestination';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

export const SinglePassageRenderer: React.FunctionComponent<IPassageRendererOwnProps> = ({
  config,
  context: {
    footers,
    headers,
    passagesMap,
    soundManager,
    store: {
      dispatch,
      getState,
    },
  },

  passageFunctions,
}) => {
  const {
    history: {
      present: {
        lastLinkTags,
        passageName,
        storyState,
      },
    },
  } = getState();

  return (
    <>
      <SkipToContentLinkDestination />

      <PassageContainer
        config={config}
        dispatch={dispatch}
        footers={footers}
        headers={headers}
        lastLinkTags={lastLinkTags}
        passageObject={passagesMap[passageName]}
        soundManager={soundManager}
        storyState={storyState}
        {...passageFunctions}
      />
    </>
  );
};
