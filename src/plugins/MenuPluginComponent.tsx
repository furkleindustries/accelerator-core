import {
  AppBar,
} from '../components/AppBar';
import classNames from 'classnames';
import {
  RestartButton,
} from '../components/RestartButton';
import {
  RewindButton,
} from '../components/RewindButton';
import {
  StoryOptionsConnected,
} from '../components/StoryOptions';
import {
  Toolbar,
} from '../components/Toolbar';

import * as React from 'react';

import builtInStyles from '../../passages/_global-styles/built-ins.less';
import styles from './MenuPlugin.less';

export const MenuPluginComponent: React.FunctionComponent = () => (
  <AppBar
    className={classNames(builtInStyles.header, styles.menu, 'header')}
    position="relative"
  >
    <Toolbar className={classNames(styles.toolbar, 'toolbar')}>
      <div className={classNames(styles.rewindContainer, 'rewindContainer')}>
        <RewindButton>Rewind</RewindButton>
      </div>

      <div className={classNames(styles.restartContainer, 'restartContainer')}>
        <RestartButton>Restart</RestartButton>
      </div>

      <div className={classNames(
        styles.storyOptionsContainer,
        'storyOptionsContainer',
      )}>
        <StoryOptionsConnected />
      </div>
    </Toolbar>
  </AppBar>
);
