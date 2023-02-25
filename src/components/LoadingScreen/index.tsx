import {
  AppStyleProvider,
} from '../AppStyleProvider';
import {
  Article,
} from '../Article';
import {
  Button,
} from '../Button';
import {
  CircularProgress,
} from '../CircularProgress';
import classNames from 'classnames';
import {
  getImageCdnUrl,
} from '../../../passages/_images/getImageCdnUrl';
import {
  ILoadingScreenOwnProps,
} from './ILoadingScreenOwnProps';
import {
  ILoadingScreenState,
} from './ILoadingScreenState';
import {
  LinearProgress,
} from '../LinearProgress';
import {
  Section,
} from '../Section';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export class LoadingScreen extends React.PureComponent<ILoadingScreenOwnProps> {
  public readonly state: ILoadingScreenState = {
    description: this.props.initialDescription || 'Loading...',
    fadingOut: false,
    ticks: 0,
    loaded: false,
  };

  public readonly render = () => {
    const {
      bodyText,
      config,
      config: {
        storyMetadata: {
          description: storyDescription,
          title: storyTitle,
        },
      },

      logoPath,
      progressMax,
      startButtonContent,
      title,
    } = this.props;

    const {
      description,
      fadingOut,
      loaded,
      ticks,
    } = this.state;

    const isDone = ticks >= progressMax;

    const variant = progressMax > 0 ? 'determinate' : 'indeterminate';
    const ProgressComp = variant === 'determinate' ?
      LinearProgress :
      CircularProgress;

    const value = (ticks / progressMax) * 100;

    const startButtonDefaultMessage =  `Start ${title || storyTitle}`;
    const startButtonRendered = startButtonContent || startButtonDefaultMessage;
    let startButtonStrContent = startButtonRendered as string;
    if (isDone && typeof startButtonContent !== 'string') {
      startButtonStrContent = startButtonDefaultMessage;
    }

    return (
      <React.StrictMode>
        <AppStyleProvider>
          <Article
            className={classNames(
              builtIns['loading-screen'],
              'loading-screen',
              {
                [builtIns['loaded']]: loaded,
                loaded,
              },

              {
                'fading-out': fadingOut,
                [builtIns['fading-out']]: fadingOut,
              },
            )}

            role="document"
            aria-roledescription="Loading screen"
          >
            <Section
              className={classNames(
                builtIns['loading-screen-content-container'],
                'loading-screen-content-container',
              )}

              role="article"
            >
              <Typography
                variant="h2"
                component="h1"
                className={classNames(
                  builtIns['loading-screen-title'],
                  'loading-screen-title',
                )}
              >
                {title || storyTitle || 'Untitled Accelerator Story'}
              </Typography>

              {storyDescription ?
                <Typography
                  variant="h3"
                  component="h2"
                  className={classNames(
                    builtIns['loading-screen-story-description'],
                    'loading-screen-story-description',
                  )}

                  role="contentinfo"
                >
                  {storyDescription}
                </Typography> :
                null}

              <Button
                className={classNames(
                  builtIns['loading-screen-confirm'],
                  'loading-screen-confirm',
                )}

                disabled={!loaded}
                role="link"
                aria-roledescription="Continue"
                title={startButtonStrContent}
                onClick={this.loadHandler}
              >
                {startButtonRendered}
              </Button>

              <div
                className={classNames(
                  builtIns['loading-screen-progress-container'],
                  'loading-screen-progress-container',
                )}

                role={loaded ? 'presentation' : 'group'}
                aria-hidden={loaded}
              >
                <ProgressComp
                  value={value}
                  variant={variant}
                />
              </div>

              <div
                className={classNames(
                  builtIns['loading-screen-live-text-area'],
                  'loading-screen-live-text-area',
                )}

                role={loaded ? 'presentation' : 'group'}
                aria-hidden={loaded}
              >
                <Typography
                  className={classNames(
                    builtIns['loading-screen-body-text'],
                    'loading-screen-body-text',
                  )}
      
                  paragraph={true}
                  role={loaded ? 'presentation' : 'group'}
                  aria-hidden={loaded}
                >
                  <Typography
                    className={classNames(
                      builtIns['loading-screen-body-text-emphasis'],
                      'loading-screen-body-text-emphasis',
                    )}

                    component="em"
                    role={loaded ? 'presentation' : 'status'}
                    aria-atomic={loaded}
                    aria-live={loaded ? 'polite' : 'off'}
                    aria-hidden={loaded}
                  >
                    {loaded ?
                      bodyText || 'The story is loaded.' :
                      bodyText || 'The story is loading. Thank you for your patience.'}
                  </Typography>
                </Typography>

                <Typography
                  className={classNames(
                    builtIns['loading-screen-description'],
                    'loading-screen-description',
                  )}

                  paragraph={true}
                  role="presentation"
                  aria-hidden="true"
                >
                  {description}
                </Typography>
              </div>
            </Section>

            <div
              className={classNames(
                builtIns['loading-screen-logo-container'],
                'loading-screen-logo-container',
              )}

              role="presentation"
            >
              <img
                className={classNames(
                  builtIns['loading-screen-logo'],
                  'loading-screen-logo',
                )}

                alt="The secondary Accelerate logo, with Mother and a halo of flies."
                src={logoPath || `${getImageCdnUrl(config)}logo-two.webp`}
              />

              <div
                className={classNames(
                  builtIns['loading-screen-logo-frontdrop'],
                  'loading-screen-logo-frontdrop',
                )}

                role="presentation"
                aria-hidden="true"
              ></div>
            </div>
          </Article>
        </AppStyleProvider>
      </React.StrictMode>
    );
  };

  public readonly componentDidMount = () => {
    const {
      addProgressListener,
      config,
      onDescriptionChange,
      progressMax,
    } = this.props;

    addProgressListener((ticks) => {
      if (ticks >= progressMax) {
        this.setState({
          loaded: true,
          ticks: progressMax,
        });
      } else {
        this.setState({ ticks });
      }
    });

    onDescriptionChange((description) => {
      if (this.state.ticks < progressMax) {
        this.setState({ description });
      } else {
        this.setState({ description: 'All preloads complete.' });
      }
    });

    (document as any).firstElementChild.style.setProperty(
      '--loading-screen-done-pixel-score',
      `${(this.state.ticks / progressMax) * 100}px`,
    );

    let imageDirPath = getImageCdnUrl(config);
    if (imageDirPath.startsWith('images/')) {
      imageDirPath = `../../${imageDirPath}`;
    }

    if (imageDirPath && !imageDirPath.endsWith('/')) {
      imageDirPath += '/';
    }

    (document as any).firstElementChild.style.setProperty(
      '--noise-background-image-app-bar',
      `url("${imageDirPath}noise_1280x1280_1.webp")`,
    );
    
    (document as any).firstElementChild.style.setProperty(
      '--noise-background-image-body',
      `url("${imageDirPath}noise_1280x1280_1.webp")`,
    );
  };

  public readonly componentDidUpdate = () => {
    (document as any).firstElementChild.style.setProperty(
      '--loading-screen-done-pixel-score',
      `${(this.state.ticks / this.props.progressMax) * 100}px`,
    );
  };

  public readonly componentWillUnmount = () => {
    (document.firstElementChild as HTMLElement).style.removeProperty(
      '--loading-screen-done-pixel-score',
    );
  };

  public readonly loadHandler = () => {
    const {
      completeLoad,
      fadeOutDuration,
      progressMax: ticks,
    } = this.props;

    this.setState({
      fadingOut: true,
      loaded: true,
      ticks,
    });
  
    setTimeout(completeLoad, fadeOutDuration);
  };
}
