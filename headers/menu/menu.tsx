import {
  AppBar,
  Button,
  Dialog,
  RestartButton,
  RewindButton,
  Toolbar,
} from '../../bundles/componentsBundle';
import {
  IMenuState,
} from './IMenuState';
import {
  IHeader,
  IPassageProps,
} from '../../bundles/passagesBundle';
import {
  SoundManagerAudioPanel,
} from '../../src/components/SoundManagerAudioPanel/SoundManagerAudioPanel';

import * as React from 'react';

import builtInStyles from '../../passages/_global-styles/built-ins.scss';
import styles from './menu.scss';

class Menu extends React.PureComponent<IPassageProps, IMenuState> {
  public readonly state: IMenuState = { soundPanelVisible: false };

  public render = () => {
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
                <SoundManagerAudioPanel className={styles.soundManagerAudioPanel} />
              </Dialog>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  private toggleSoundPanelVisibility = () => {
    const { soundPanelVisible } = this.state;
    this.setState({ soundPanelVisible: !soundPanelVisible });
  };
}

const passage: IHeader = {
  /* string: the name of the header. */
  name: 'menu',

  /* React.ComponentType<IPassageProps>: the content that should be displayed.
   * Should be formatted in JSX style. */
  contents: Menu,
};

/* Always make the passage object a default export. */
export default passage;
