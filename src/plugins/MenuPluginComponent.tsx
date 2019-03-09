import {
  AppBar,
} from '../components/AppBar/AppBar';
import {
  StoryOptionsConnected,
} from '../components/StoryOptions/StoryOptions';
import {
  RestartButton,
} from '../components/RestartButton/RestartButton';
import {
  RewindButton,
} from '../components/RewindButton/RewindButton';
import {
  Toolbar,
} from '../components/Toolbar/Toolbar';

import * as React from 'react';

import builtInStyles from '../../passages/_global-styles/built-ins.scss';
import styles from './MenuPlugin.scss';

export const MenuPluginComponent: React.FunctionComponent = () => (
  <AppBar
    className={`${styles.menu} ${builtInStyles.header} header`}
    position="relative"
  >
    <Toolbar className={`${styles.toolbar} toolbar`}>
      <div className={`${styles.rewindContainer} rewindContainer`}>
        <RewindButton>
          Rewind
        </RewindButton>
      </div>

      <div className={`${styles.restartContainer} restartContainer`}>
        <RestartButton>
          Restart
        </RestartButton>
      </div>

      <div className={`${styles.storyOptionsContainer} storyOptionsContainer`}>
        <StoryOptionsConnected />
      </div>
    </Toolbar>
  </AppBar>
);