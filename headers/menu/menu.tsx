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
  assertValid,
} from 'ts-assertions';

import builtInStyles from '../../src/passages/styles.scss';
import styles from './menu.scss';

/* The header gets all the same props as a normal passage. */
class Menu extends React.PureComponent<IPassageProps, IMenuState> {
  public readonly state = {
    soundPanel: undefined,
    soundPanelVisible: false,
  };

  private readonly soundPanelRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: any) {
    super(props);
    this.toggleSoundPanelVisibility = this.toggleSoundPanelVisibility.bind(this);
  }

  public componentDidMount() {
    const { soundManager } = this.props;
    this.setState({ soundPanel: soundManager.generateVolumePanelElement() });
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

          <div className={`${styles.soundPanelContentsContainer} soundPanelContentsContainer`}>
            <button
              className={`${styles.soundPanelCloseButton} soundPanelCloseButton`}
              onClick={this.toggleSoundPanelVisibility}
              {...(soundPanelVisible ? {} : { hidden: true })}
            >X</button>

            <div
              className={`${styles.soundPanel} soundPanel`}
              ref={this.soundPanelRef}
            >
            </div>
          </div>
        </div>
      </header>
    );
  }

  private toggleSoundPanelVisibility() {
    const {
      soundPanel,
      soundPanelVisible,
    } = this.state;

    const newVal = !soundPanelVisible;
    this.setState({ soundPanelVisible: newVal });

    /* All of this must be done through refs as sound-manager does not export
     * React components at present. */
    const safeNode = assertValid<HTMLDivElement>(
      this.soundPanelRef.current,
    );

    const safeSoundPanel = assertValid<HTMLElement>(
      soundPanel,
    );

    if (newVal) {
      safeNode.appendChild(safeSoundPanel);
    } else {
      safeNode.removeChild(safeSoundPanel);
    }
  }
}

const passage: IHeader = {
  /* string: the name of the header. */
  name: 'menu',

  /* ComponentClass<IPassageProps, any> | SFC<IPassageProps>:
   * the content that should be displayed. Should be formatted in JSX style. */
  contents: Menu,
};

/* Always make the passage object a default export. */
export default passage;
