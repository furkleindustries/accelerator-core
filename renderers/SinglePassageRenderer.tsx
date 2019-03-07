import {
  AbstractPassageRenderer,
} from '../src/renderers/AbstractPassageRenderer';
import {
  PassageContainer,
} from '../src/components/PassageContainer/PassageContainer';
import {
  SkipToContentLinkDestination,
} from '../src/components/SkipToContentLinkDestination/SkipToContentLinkDestination';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

export class SinglePassageRenderer extends AbstractPassageRenderer {
  public readonly render = () => {
    const {
      footers,
      headers,
      passagesMap,
      soundManager,
      store: {
        dispatch,
        getState,
      },
    } = this.context;

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
          dispatch={dispatch}
          footers={footers}
          headers={headers}
          lastLinkTags={lastLinkTags}
          passageObject={passagesMap[passageName]}
          soundManager={soundManager}
          storyState={storyState}
          {...this.passageFunctions}
        />
      </>
    );
  };
};
