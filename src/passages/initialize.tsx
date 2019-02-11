import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  InitializationOptions,
} from './InitializationOptions';
import {
  ConnectedLoadingScreen,
  mapStateToProps,
} from '../components/LoadingScreen/LoadingScreen';
import {
  render,
} from 'react-dom';
import {
  Provider, connect,
} from 'react-redux';
import {
  createStore,
} from 'redux';
import {
  assert,
} from 'ts-assertions';

import * as config from '../../accelerator.config';

import * as React from 'react';

import logo from '../../public/logo.svg';

export async function initialize() {
  type temp = (args: InitializationOptions) => Promise<void>;
  let init: temp;
  try {
    init = require('../../passages/_initialization');
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      throw err;
    }
  }

  if (typeof init! !== 'function') {
    return;
  }

  let progressMax: number;
  let progressStart: number;
  let progressTicks: number = 0;

  const loadStore = createStore(() => progressTicks);
  const addProgressTicks = (ticks: number) => {
    assert(ticks >= 1 && ticks % 1 === 0);
    progressTicks += ticks;
    loadStore.dispatch({ type: 'update' });
  };

  const initOptions: InitializationOptions = {
    addProgressTicks,

    beginLoad(options) {
      const {
        component,
        logoPath,
        title,
      } = getFrozenObject(options || {});

      if (progressMax) {
        progressStart = progressStart || 0;
        progressTicks = progressStart;
      }

      const LoadComponent = (
        component ?
          connect(mapStateToProps)(component) :
          ConnectedLoadingScreen
      );

      render(
        <Provider store={loadStore}>
          <LoadComponent
            addProgressTicks={addProgressTicks}
            progressMax={progressMax}
            progressStart={progressStart}
            logoPath={logoPath || logo}
            title={title || config.storyTitle}
          />
        </Provider>,
        document.querySelector('#load'),
      );
    },

    setProgressMax(max) {
      assert(max >= 1 && max % 1 === 0);
      progressMax += max;
    },

    setProgressStart(start) {
      assert(start >= 0 && start % 1 === 0);
      progressStart += start;
    },
  };

  await init(initOptions);
}
