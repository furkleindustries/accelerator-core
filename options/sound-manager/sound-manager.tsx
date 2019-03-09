import {
  Button,
} from '../../src/components/Button/Button';
import classnames from 'classnames';
import {
  Dialog,
} from '../../src/components/Dialog/Dialog';
import {
  IStoryOptionComponentOwnProps,
} from '../../src/storyOptions/IStoryOptionComponentOwnProps';
import {
  ISoundManagerOptionState,
} from './ISoundManagerOptionState';
import {
  SoundManagerAudioPanel,
} from '../../src/components/SoundManagerAudioPanel/SoundManagerAudioPanel';

import * as React from 'react';

import styles from './sound-manager.scss';
import { IStoryOption } from '../../src/storyOptions/IStoryOption';

class SoundManagerOption extends React.PureComponent<
  IStoryOptionComponentOwnProps,
  ISoundManagerOptionState
>  {
  public readonly state = { soundPanelVisible: false };

  public readonly render = () => (
    <div className={classnames(styles.soundPanelContainer, 'soundPanelContainer')}>
      <Button
        className={classnames('soundPanelButton')}
        onClick={this.toggleSoundPanelVisibility}
        {...(this.state.soundPanelVisible ? { hidden: true } : {})}
      >
        Audio options
      </Button>

      <div className={classnames('soundPanelContentsContainer')}>
        <Dialog
          dialogActions={<>
            <Button
              className={classnames('soundPanelCloseButton')}
              onClick={this.toggleSoundPanelVisibility}
            >
              Close
            </Button>,
          </>}
          includeTitle="Audio Options"
          open={this.state.soundPanelVisible}
        >
          <SoundManagerAudioPanel />
        </Dialog>
      </div>
    </div>
  );

  private readonly toggleSoundPanelVisibility = () => this.setState({
    soundPanelVisible: !this.state.soundPanelVisible,
  });
}

const option: IStoryOption = {
  content: SoundManagerOption,
  name: 'sound-manager-option',
  optionPropName: null,
};

export default option;