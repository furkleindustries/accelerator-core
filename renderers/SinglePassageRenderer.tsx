import {
  AppContextConsumerWrapper,
} from '../src/components/AppContextConsumerWrapper';
import {
  IPassage,
} from '../src/passages/IPassage';
import {
  IPassageRendererOwnProps,
} from '../src/renderers/IPassageRendererOwnProps';
import {
  PassageContainer,
} from '../src/components/PassageContainer';
import {
  SkipToContentLinkDestination,
} from '../src/components/SkipToContentLinkDestination';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

// This can't be refactored to a normal `connect` binding because it cannot
// rerender according to the store subscription. Rather, it is controlled
// by the parent component.
export const SinglePassageRenderer: React.FC<IPassageRendererOwnProps> = ({
  passageFunctions,
}) => (
  <AppContextConsumerWrapper>
    {({
      config,
      footers,
      getSoundManager,
      headers,
      passagesMap,
      store,
      store: {
        dispatch,
        getState,
      },
    }) => {
      const {
        history: {
          present: {
            lastLinkTags,
            passageName,
            storyEnded,
            storyState,
          },
        },
      } = getState();

      const passageObject = assertValid<IPassage>(
        passagesMap[passageName],
        `No passage matching the name "${passageName}" could be found in the passages map.`,
      );

      return (
        <>
          <SkipToContentLinkDestination />

          <PassageContainer
            {...passageFunctions}

            config={config}
            dispatch={dispatch}
            getSoundManager={getSoundManager}
            footers={footers}
            headers={headers}
            lastLinkTags={lastLinkTags}
            passageObject={passageObject}
            store={store}
            storyEnded={storyEnded}
            storyState={storyState}
          />
        </>
      );
    }}
  </AppContextConsumerWrapper>
);
