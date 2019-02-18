import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  getNormalizedAcceleratorConfig,
} from '../configuration/getNormalizedAcceleratorConfig';
import {
  IBeginLoadOptions,
} from './IBeginLoadOptions';
import {
  ILoadingScreenOwnProps,
} from '../components/LoadingScreen/ILoadingScreenOwnProps';
import {
  LoadingScreen,
} from '../components/LoadingScreen/LoadingScreen';
import {
  ReactElement,
} from 'react';
import {
  render,
  unmountComponentAtNode,
} from 'react-dom';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

import logo from '../../public/logo.svg';

const { storyTitle } = getNormalizedAcceleratorConfig();

export class InitializationHandler {
  public readonly selector = '#load';

  private component: ReactElement<ILoadingScreenOwnProps>;
  private ticks = 0;
  private progressMax: number;
  private progressStart: number = 0;
  private doneCallback: () => void;

  public beginLoad = (options?: IBeginLoadOptions) => {
    const opts = getFrozenObject(options! || {});
    const {
      bodyText = '',
      component = LoadingScreen,
      descriptions = [],
      doneCallback,
      logoPath = logo,
      progressMax,
      progressStart,
      title = storyTitle,
    } = opts;

    if (typeof doneCallback === 'function') {
      this.doneCallback = doneCallback;
    }

    this.progressMax = progressMax || 0;
    if (!this.progressMax) {
      this.completeLoad();
      return;
    }

    this.progressStart = progressStart || 0;

    const updateTicks = (ticks: number) => this.updateProgressTicks(ticks);

    const LoadComponent = component || LoadingScreen;
    this.component = <LoadComponent
      bodyText={bodyText || ''}
      descriptions={descriptions}
      progressMax={this.progressMax}
      progressStart={this.progressStart}
      logoPath={logoPath || logo}
      title={title || storyTitle}
      updateTicks={updateTicks}
    />;

    render(
      this.component,
      document.querySelector(this.selector),
    );
  }

  public updateProgressTicks = (total: number) => {
    this.ticks = assertValid<number>(
      total,
      null,
      (ticks: any) => ticks >= 1 && ticks % 1 === 0,
    );

    if (this.ticks > this.progressMax) {
      this.completeLoad();
    }
  }

  private completeLoad = () => {
    if (typeof this.doneCallback === 'function') {
      this.doneCallback();
    }

    unmountComponentAtNode(document.querySelector(this.selector)!);
    document.querySelector('#root')!.setAttribute('aria-busy', 'false');
  }

  public setProgressMax = (max: number) => (
    this.progressMax = assertValid<number>(
      max,
      null,
      (max: any) => max >= 1 && max % 1 === 0,
    )
  );

  public setProgressStart = (start: number) => (
    this.progressStart = assertValid<number>(
      start,
      null,
      (start: any) => start >= 0 && start % 1 === 0,
    )
  );
}
