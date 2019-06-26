import {
  AppBar,
} from '../components/AppBar/AppBar';
import classnames from 'classnames';
import {
  RestartButton,
} from '../components/RestartButton/RestartButton';
import {
  RewindButton,
} from '../components/RewindButton/RewindButton';
import {
  StoryOptionsConnected,
} from '../components/StoryOptions/StoryOptions';
import {
  Toolbar,
} from '../components/Toolbar/Toolbar';

import * as React from 'react';

import builtInStyles from '../../passages/_global-styles/built-ins.less';
import styles from './MenuPlugin.less';

export const MenuPluginComponent: React.FunctionComponent = () => (
  <AppBar
    className={classnames('header', styles.menu, builtInStyles.header)}
    position="relative"
  >
    <Toolbar className={classnames('toolbar', styles.toolbar)}>
      <div className={classnames('rewindContainer', styles.rewindContainer)}>
        <RewindButton>
          Rewind
        </RewindButton>
      </div>

      <div className={classnames('restartContainer', styles.restartContainer)}>
        <RestartButton>
          Restart
        </RestartButton>
      </div>

      <div className={classnames(
        'storyOptionsContainer',
        styles.storyOptionsContainer,
      )}>
        <StoryOptionsConnected />
      </div>
    </Toolbar>
  </AppBar>
);