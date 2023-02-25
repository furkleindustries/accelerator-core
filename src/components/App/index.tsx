import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  AppContextProviderWrapper,
} from '../AppContextProviderWrapper';
import {
  appDocumentSelector,
  loadDocumentSelector,
} from '../../renderers/appSelectors';
import {
  AppStyleProvider,
} from '../AppStyleProvider';
import {
  clearLoadingScreen,
} from '../../passages/clearLoadingScreen';
import {
  IAppState,
} from './IAppState';
import {
  IAppOwnProps,
} from './IAppOwnProps';
import {
  hot,
} from 'react-hot-loader/root';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

export const loadingFadeOutDuration = 2500;

export class App extends React.PureComponent<IAppOwnProps, IAppState> {
  public static readonly getDerivedStateFromError = (error: Error | null) => ({
    error,
  });

  public readonly state: IAppState = {
    error: null,
    seenError: false,
  };

  public readonly render = () => (
    // Don't render the error unless we're in debug mode. It's not desirable
    // for the production build to destroy the game experience to display
    // uncaught errors.
    <React.StrictMode>
      <AppStyleProvider>
        {this.state.error && this.props.initialContext.store.getState().debug ?
          <div role="group">
            <Typography
              paragraph={true}
              role="status"
            >
              {this.state.error.toString()}
            </Typography>

            {'stack' in (this.state.error as any) ?
              <Typography
                paragraph={true}
                role="status"
              >
                {(this.state.error as any).stack.toString()}
              </Typography> :
              null}
          </div> :
          null}

        <AppContextProviderWrapper initialContext={{ ...this.props.initialContext }}>
          <AppContextConsumerWrapper>
            {({
              config,
              getSoundManager,
              plugins,
              store,
              store: {
                getState,
                subscribe,
              },
            }) => {
              const fadeOutDuration = loadingFadeOutDuration;
              const imagesToPreload = config.imageManager.imagesToPreload;
              const soundGroups = config.soundManager.soundsToLoad;
              const soundManager = getSoundManager();

              /* Execute the logic in the authored initialization script. */
              const LazyLoadedRenderingContainer = React.lazy(
                () => new Promise<{ 'default': React.ComponentType }>(
                  async (resolve, reject) => {
                    try {
                      await Promise.all(plugins.map(({ beforeStoryLoad }) => {
                        if (typeof beforeStoryLoad === 'function') {
                          return beforeStoryLoad({
                            config,
                            getSoundManager,
                            store,
                          });
                        }

                        return Promise.resolve();
                      }));

                      const { initialize } = await import('../../passages/initialize');

                      initialize({
                        appDocumentSelector,
                        config,
                        fadeOutDuration,
                        imagesToPreload,
                        loadDocumentSelector,
                        soundGroups,
                        soundManager,
                        store,
                      }).then(null, reject);

                      const { RenderingContainer } = await import('../RenderingContainer');

                      const removeListener = subscribe(() => {
                        if (getState().storyLoaded) {
                          removeListener();
                          clearLoadingScreen(appDocumentSelector, loadDocumentSelector);
                          return resolve({ 'default': RenderingContainer as any });
                        }
                      })
                    } catch (err) {
                      return reject(err);
                    }
                  }
                ),
              );

              return (
                <React.Suspense fallback={null}>
                  <LazyLoadedRenderingContainer />
                </React.Suspense>
              );
            }}
          </AppContextConsumerWrapper>
        </AppContextProviderWrapper>
      </AppStyleProvider>
    </React.StrictMode>
  );

  public readonly componentDidCatch = (err: Error | string) => {
    const {
      initialContext: {
        config: { loggers },
        store: { getState },
      },
    } = this.props;

    const { seenError } = this.state;

    if (!seenError) {
      const { debug } = getState();
      // Emit only one debugger statement. Consider modifying to allow a counter.
      if (debug) {
        // Omit semicolon so as to make this easy to ignore through search.
        debugger
      }

      this.setState({ seenError: true });
    }

    loggers.error(err.toString());
  };
}

export default hot(App);
