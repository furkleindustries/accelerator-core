import {
  AppBar,
} from '../components/AppBar/AppBar';
import {
  Button,
} from '../components/Button/Button';
import {
  Dialog,
} from '../components/Dialog/Dialog';
import {
  RestartButton,
} from '../components/RestartButton/RestartButton';
import {
  RewindButton,
} from '../components/RewindButton/RewindButton';
import {
  Toolbar,
} from '../components/Toolbar/Toolbar';
import {
  IMenuState,
} from './IMenuState';
import {
  SoundManagerAudioPanel,
} from '../components/SoundManagerAudioPanel/SoundManagerAudioPanel';

import * as React from 'react';

import builtInStyles from '../../passages/_global-styles/built-ins.scss';
import styles from './MenuPlugin.scss';

export class MenuPluginComponent extends React.PureComponent<{}, IMenuState> {
  public readonly state: IMenuState = { soundPanelVisible: false };

  public readonly render = () => {
    const { soundPanelVisible } = this.state;

    return (
      <AppBar
        className={`${styles.menu} ${builtInStyles.header} header`}
        position="relative"
      >
        <Toolbar className={`${styles.toolbar} toolbar`}>
          <div className={`${styles.rewindContainer} rewind`}>
            <RewindButton>
              Rewind
            </RewindButton>
          </div>

          <div className={`${styles.restartContainer} restartContainer`}>
            <RestartButton>
              Restart
            </RestartButton>
          </div>

          <div className={`${styles.soundPanelContainer} soundPanelContainer`}>
            <Button
              className={`soundPanelButton`}
              onClick={this.toggleSoundPanelVisibility}
              {...(soundPanelVisible ? { hidden: true } : {})}
            >
              Audio options
            </Button>

            <div className={`soundPanelContentsContainer`}>
              <Dialog
                dialogActions={[
                  <Button
                    className={`soundPanelCloseButton`}
                    key={0}
                    onClick={this.toggleSoundPanelVisibility}
                  >
                    Close
                  </Button>,
                ]}
                includeTitle="Audio Options"
                open={soundPanelVisible}
              >
                <SoundManagerAudioPanel className={``} />
              </Dialog>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  private readonly toggleSoundPanelVisibility = () => {
    const { soundPanelVisible } = this.state;
    this.setState({ soundPanelVisible: !soundPanelVisible });
  };
}