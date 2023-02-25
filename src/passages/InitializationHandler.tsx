import {
  createStoryLoadedAction,
} from '../actions/creators/createStoryLoadedAction';
import {
  getImageCdnUrl,
} from '../../passages/_images/getImageCdnUrl';
import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IBeginLoadOptions,
} from './IBeginLoadOptions';
import {
  ILoadingScreenOwnProps,
} from '../components/LoadingScreen/ILoadingScreenOwnProps';
import {
  InitializationHandlerOptions,
} from './InitializationHandlerOptions';
import {
  IState,
} from '../state/IState';
import {
  loadingFadeOutDuration,
} from '../components/App';
import {
  LoadingScreen,
} from '../components/LoadingScreen';
import {
  loadSoundGroups,
} from '../../passages/_sounds/loadSoundGroups';
import {
  render,
} from 'react-dom';
import type {
  Store,
} from 'redux';
import {
  IManager,
} from 'sound-manager';
import {
  IGroupsDefinitionMap,
} from '../../passages/_sounds/ISoundsDefinitionMap';
import {
  MediaPreloadStrategies,
} from '../configuration/MediaPreloadStrategies';
import {
  InitializationProgressUpdater,
} from './InitializationProgressUpdater';
import {
  ImagePreloadMap,
} from '../configuration/ImagePreloadMap';
import {
  preloadImages,
} from '../../passages/_images/preloadImages';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export class InitializationHandler implements InitializationHandlerOptions {
  private readonly progressListeners: InitializationProgressUpdater[] = [];
  private progressMax = 0;
  private readonly requestFrameIds = new Set<any>();
  private ticks = 0;
  private title = '';

  public readonly appDocumentSelector: string;
  public readonly config: IAcceleratorConfigNormalized;
  public descriptionCallback: (description: string) => void;
  public readonly fadeOutDuration: number;
  public readonly imagesToPreload: ImagePreloadMap = {};
  public readonly loadDocumentSelector: string;
  public readonly soundGroups: IGroupsDefinitionMap = {};
  public readonly soundManager: IManager;
  public readonly store: Store<IState>;

  constructor({
    appDocumentSelector,
    config,
    imagesToPreload,
    loadDocumentSelector,
    soundGroups,
    soundManager,
    store,
  }: InitializationHandlerOptions) {
    this.appDocumentSelector = assertValid(
      appDocumentSelector,
      'The appDocumentSelector property did not exist in the InitializationHandler options.',
    );

    this.config = assertValid(config);
    this.imagesToPreload = imagesToPreload;
    this.loadDocumentSelector = assertValid(
      loadDocumentSelector,
      'The loadDocumentSelector property did not exist in the InitializationHandler options.',
    );

    this.soundGroups = soundGroups;
    this.soundManager = soundManager;
    this.store = store;
  }

  public beginLoad = (options?: IBeginLoadOptions) => {
    const opts = options! || {};
    const {
      doneCallback,
      progressMax,
      title,
    } = opts;

    this.title = title ||
      this.config.storyMetadata.title ||
      `Loading ${this.config.storyMetadata.title}...`;

    if (typeof doneCallback === 'function') {
      this.doneCallback = doneCallback;
    }

    this.setProgressMax(progressMax || 0);
    this.renderComponent(opts);
  };

  public addProgressTicks = (toAdd = 1) => {
    const add = assertValid<number>(
      toAdd,
      `The value passed during initialization to InitializationHandler.addProgressTicks, ${toAdd}, was not valid.`,
      (total) => total !== -1 && this.validator(total),
    );

    this.ticks += add;
    this.callProgressListeners(this.ticks);
  };

  public completeLoad = () => {
    if (typeof this.doneCallback === 'function') {
      this.doneCallback();
    }

    for (const id of this.requestFrameIds) {
      cancelAnimationFrame(id);
    }

    this.requestFrameIds.clear();

    this.store.dispatch(createStoryLoadedAction(true));
  };

  private doneCallback = () => {
    const {
      loggers: { log },
      storyMetadata: { title },
    } = this.config;

    const storyTitle = this.title || title;

    log(`The story "${storyTitle}" has been fully initialized.`);
  };

  public readonly loadSoundGroups = (
    soundNamesToPreload: Array<[ string, string ]>,
    nonCriticalSoundNames: Array<[ string, string ]>,
  ) => loadSoundGroups({
    config: this.config,
    groupsMap: this.soundGroups,
    manager: this.soundManager,
    nonCriticalSoundNames,
    soundNamesToPreload,
  });

  public readonly preloadImages = (
    callback?: (err?: Error, imageName?: string) => void,
  ) => (
    preloadImages(
      Object.values(this.imagesToPreload)
        .filter(({ preloadStrategy }) => (
          preloadStrategy === MediaPreloadStrategies.PreloadDeferred
        ))
        .map(({
          name: imageName,
          url,
        }) => [
          imageName,
          url,
        ]),

      callback,
    )
  );

  public setProgressMax = (max: number) => {
    this.progressMax = assertValid<number>(
      max,
      null,
      this.validator,
    );
  };

  public validator = (value: number) => (
    value === -1 || (value >= 0 && value % 1 === 0)
  );

  public renderComponent = (options?: IBeginLoadOptions) => {
    const opts = options! || {};
    const {
      bodyText,
      component,
      config,
      fadeOutDuration: fadeOutDurationOpt,
      initialDescription,
      logoPath: logoPathRaw,
      title,
    } = opts;

    const addProgressListener = this.addProgressListener;
    const completeLoad = this.completeLoad;
    const onDescriptionChange = this.setDescriptionCallback;
    const progressMax = this.progressMax;

    const fadeOutDuration = fadeOutDurationOpt || loadingFadeOutDuration;
    const logoPath = logoPathRaw || `${getImageCdnUrl(config)}logo-one.webp`;
    const startButtonContent = 'Come to Source.';

    const props: ILoadingScreenOwnProps = {
      addProgressListener,
      bodyText,
      completeLoad,
      config,
      fadeOutDuration,
      initialDescription,
      logoPath,
      progressMax,
      startButtonContent,
      onDescriptionChange,
      title,
    };

    const LoadComponent = component || LoadingScreen;

    render(
      <LoadComponent {...props} />,
      document.body.querySelector(this.loadDocumentSelector),
    );
  };

  public readonly addProgressListener = (
    callback: InitializationProgressUpdater,
  ) => {
    if (!this.progressListeners.includes(callback)) {
      this.progressListeners.push(callback);
    }
  };

  public readonly removeProgressListener = (
    callback: InitializationProgressUpdater,
  ) => {
    if (this.progressListeners.includes(callback)) {
      this.progressListeners.splice(
        this.progressListeners.indexOf(callback),
        1,
      );
    }
  };

  public readonly callProgressListeners = (progress: number) => {
    this.progressListeners.forEach((cb) => {
      const frameId = requestAnimationFrame(() => {
        this.requestFrameIds.delete(frameId);
        cb(progress);
      });

      this.requestFrameIds.add(frameId);
    });
  };

  public readonly setDescriptionCallback = (callback: (description: string) => void) => {
    this.descriptionCallback = callback;
  };

  public readonly updateDescription = (description: string) => {
    if (typeof this.descriptionCallback === 'function') {
      this.descriptionCallback(description);
    }
  };
}
