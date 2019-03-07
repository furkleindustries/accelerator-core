import {
  Button,
} from '../../src/components/Button/Button';
import {
  Dialog,
} from '../../src/components/Dialog/Dialog';
import {
  IOptionComponent,
} from '../../src/options/IOptionComponent';
import {
  ISoundManagerOptionState,
} from './ISoundManagerOptionState';
import {
  SoundManagerAudioPanel,
} from '../../src/components/SoundManagerAudioPanel/SoundManagerAudioPanel';

import * as React from 'react';

import styles from './sound-manager.scss';

export class SoundManagerOption extends React.PureComponent<
  {},
  ISoundManagerOptionState
> implements IOptionComponent {
  public readonly optionPropName = null;

  public readonly render = () => (
    <div className={`${styles.soundPanelContainer} soundPanelContainer`}>
      <Button
        className={`soundPanelButton`}
        onClick={this.toggleSoundPanelVisibility}
        {...(this.state.soundPanelVisible ? { hidden: true } : {})}
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
          open={this.state.soundPanelVisible}
        >
          <SoundManagerAudioPanel />
        </Dialog>
      </div>
    </div>
  );

  private readonly toggleSoundPanelVisibility = () => (
    this.setState({ soundPanelVisible: !this.state.soundPanelVisible })
  );
}