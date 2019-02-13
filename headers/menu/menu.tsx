/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import {
  RestartButton,
  RewindButton,
} from '../../src/passages/componentsBundle';
import {
  IMenuState,
} from './IMenuState';
import {
  IHeader,
  IPassageProps,
} from '../../src/passages/passagesBundle';
import {
  SoundManagerAudioPanel,
} from '../../src/components/SoundManagerAudioPanel/SoundManagerAudioPanel';

import builtInStyles from '../../src/passages/styles.scss';
import styles from './menu.scss';

/* The header gets all the same props as a normal passage. */
class Menu extends React.PureComponent<IPassageProps, IMenuState> {
  public readonly state: IMenuState = { soundPanelVisible: false };

  constructor(props: any) {
    super(props);
    this.toggleSoundPanelVisibility = this.toggleSoundPanelVisibility.bind(this);
  }

  public render() {
    const { soundPanelVisible } = this.state;

    return (
      <header
        className={`${styles.menu} ${builtInStyles.header} header`}
      >
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
          <button
            className={`${styles.soundPanelButton} ${builtInStyles.link} soundPanelButton`}
            onClick={this.toggleSoundPanelVisibility}
            {...(soundPanelVisible ? { hidden: true } : {})}
          >
            Audio options
          </button>

          <div
            className={`${styles.soundPanelContentsContainer} soundPanelContentsContainer`}
            {...(soundPanelVisible ? {} : { hidden: true })}
          >
            <button
              className={`${styles.soundPanelCloseButton} soundPanelCloseButton`}
              onClick={this.toggleSoundPanelVisibility}
            >X</button>

            <SoundManagerAudioPanel className={styles.soundManagerAudioPanel} />
          </div>
        </div>
      </header>
    );
  }

  private toggleSoundPanelVisibility() {
    const {
      soundPanelVisible,
    } = this.state;

    const newVal = !soundPanelVisible;
    this.setState({ soundPanelVisible: newVal });
  }
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
