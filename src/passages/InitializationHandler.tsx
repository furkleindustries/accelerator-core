import {
  clearLoadingScreen,
} from './clearLoadingScreen';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IBeginLoadOptions,
} from './IBeginLoadOptions';
import {
  InitializationHandlerOptions,
} from './InitializationHandlerOptions';
import {
  LoadingScreen,
} from '../components/LoadingScreen/LoadingScreen';
import {
  render,
} from 'react-dom';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

import logo from '../../public/logo.svg';

export class InitializationHandler {
  public readonly appSelector: string;
  public readonly loadSelector: string;
  public readonly config: IAcceleratorConfigNormalized;

  private progressMax: number;
  private progressStart: number = 0;
  private ticks = 0;
  private doneCallback: () => void;

  constructor({
    appSelector,
    config,
    loadSelector,
  }: InitializationHandlerOptions) {
    this.appSelector = assertValid(appSelector);
    this.config = assertValid(config);
    this.loadSelector = assertValid(loadSelector);
  }

  public beginLoad = (options?: IBeginLoadOptions) => {
    const opts = getFrozenObject(options! || {});
    const {
      descriptions,
      doneCallback,
      progressMax,
      progressStart,
    } = opts;

    if (typeof doneCallback === 'function') {
      this.doneCallback = doneCallback;
    }

    this.setProgressMax(progressMax || 0);
    this.setProgressStart(progressStart || 0);

    if (Array.isArray(descriptions) && descriptions.length) {
      if (!this.progressMax) {
        this.setProgressMax(descriptions.length);
      }
    }

    if (!this.progressMax) {
      this.completeLoad();
      return;
    }

    this.renderComponent(opts);
  }

  public updateProgressTicks = (total: number) => {
    this.ticks = assertValid<number>(
      total,
      null,
      (total) => total !== -1 && this.validator(total),
    );

    if (this.ticks > this.progressMax) {
      this.completeLoad();
    }
  };

  public completeLoad = () => {
    if (typeof this.doneCallback === 'function') {
      this.doneCallback();
    }

    clearLoadingScreen(this.appSelector, this.loadSelector);
  };

  private setProgressMax = (max: number) => {
    this.progressMax = assertValid<number>(
      max,
      null,
      this.validator,
    );

    if (this.progressMax === -1 || this.progressStart > this.progressMax) {
      this.progressStart = this.progressMax;
    }
  };

  private setProgressStart = (start: number) => {
    this.progressStart = assertValid<number>(
      start,
      null,
      this.validator,
    );

    if (this.progressStart === -1 || this.progressMax < this.progressStart) {
      this.progressMax = this.progressStart;
    }
  };

  private validator = (value: number) => (
    value === -1 || (value >= 0 && value % 1 === 0)
  );

  private renderComponent = (options?: IBeginLoadOptions) => {
    const opts = getFrozenObject(options! || {});
    const {
      bodyText,
      component,
      descriptions,
      logoPath,
      title,
    } = opts;

    const LoadComponent = component || LoadingScreen;
    render(
      <LoadComponent
        bodyText={bodyText || ''}
        descriptions={descriptions || []}
        progressMax={this.progressMax}
        progressStart={this.progressStart}
        logoPath={logoPath || logo}
        title={title || `Loading ${this.config.storyTitle}...`}
        updateTicks={this.updateProgressTicks}
      />,
      document.querySelector(this.loadSelector),
    );
  }
}
