import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  PassagePluginsWrapper,
} from '../PassagePluginsWrapper';
import {
  PassageRendererWrapperConnected,
} from '../PassageRendererWrapper';
import {
  SkipToContentLink,
} from '../SkipToContentLink';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const RenderingContainer: React.FC = () => (
  <>
    {/**
      * The first item in the tab ordering (and natural document flow)
      * should be the accessibility link used to skip to the newest passage
      * content.
      */}
    <SkipToContentLink />

    <AppContextConsumerWrapper>
      {({
        config,
        config: {
          debugOptions: { noTimings },
        },

        getSoundManager,
        passagesMap,
        plugins,
        store,
        store: { getState },
      }) => {
        const { debug } = getState();

        return (
          <div
            className={classNames(
              builtIns['rendering-container'],
              'rendering-container',
              {
                [builtIns['no-timings']]: debug && noTimings,
                'no-timings': debug && noTimings,
              },
            )}

            role="group"
          >
            <PassagePluginsWrapper
              config={config}
              getSoundManager={getSoundManager}
              passagesMap={passagesMap}
              plugins={plugins}
              store={store}
            >
              <PassageRendererWrapperConnected
                config={config}
                getSoundManager={getSoundManager}
                passagesMap={passagesMap}
                plugins={plugins}
              />
            </PassagePluginsWrapper>
          </div>
        );
      }}
    </AppContextConsumerWrapper>
  </>
);
