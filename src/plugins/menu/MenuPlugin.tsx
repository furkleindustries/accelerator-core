import classNames from 'classnames';
import {
  AppBar,
} from '../../../src/components/AppBar';
import {
  Article,
} from '../../../src/components/Article';
import {
  IPlugin,
} from '../IPlugin';
import {
  RestartButton,
} from '../../../src/components/RestartButton';
import {
  RewindButton,
} from '../../../src/components/RewindButton';
import {
  StoryOptions,
} from '../../../src/components/StoryOptions';
import {
  Toolbar,
} from '../../../src/components/Toolbar';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';
import styles from '../../../plugins/menu/index.less';

export class MenuPlugin implements IPlugin {
  public readonly beforeRender: IPlugin['beforeRender'] = () => (
    <AppBar
      className={classNames(
        builtIns['header'],
        'header',
        styles['menu'],
        'menu',
      )}

      position="relative"
    >
      <Toolbar>
        <div
          className={classNames(
            styles['rewind-container'],
            'rewind-container',
          )}

          role="group"
        >
          <RewindButton />
        </div>

        <div
          className={classNames(
            styles['restart-container'],
            'restart-container',
          )}

          role="group"
        >
          <RestartButton />
        </div>

        <Article
          className={classNames(
            styles['story-options-container'],
            'story-options-container',
          )}
        >
          <StoryOptions />
        </Article>
      </Toolbar>
    </AppBar>
  );

  public readonly shouldRerender = () => false;
}
