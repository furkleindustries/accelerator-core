import classnames from 'classnames';
import {
  IOpenable,
} from '../../src/interfaces/IOpenable';
import {
  IStoryOptionComponentOwnProps,
} from '../../src/storyOptions/IStoryOptionComponentOwnProps';
import {
  IStoryOption,
} from '../../src/storyOptions/IStoryOption';
import {
  SoundManagerAudioPanel,
} from '../../src/components/SoundManagerAudioPanel/SoundManagerAudioPanel';
import {
  StoryOptionsList,
} from '../../src/components/StoryOptionsList/StoryOptionsList';

import * as React from 'react';

import styles from './sound-manager.scss';

class SoundManagerOption extends React.PureComponent<
  IStoryOptionComponentOwnProps,
  IOpenable
> {
  public readonly state = { open: false };

  public readonly render = () => (
    <StoryOptionsList
      className={classnames(styles.soundPanelContainer, 'soundPanelContainer')}
      optionPropName="Sound options"
      onClick={this.toggleOpen}
      open={this.state.open}
    >{[
      <SoundManagerAudioPanel key={0} />
    ]}</StoryOptionsList>
  );

  private readonly toggleOpen = () => this.setState({
    open: !this.state.open,
  });
}

const option: IStoryOption = {
  content: SoundManagerOption,
  name: 'sound-manager-option',
  optionPropName: null,
};

export default option;
