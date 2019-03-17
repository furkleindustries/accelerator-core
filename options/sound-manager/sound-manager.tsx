import classnames from 'classnames';
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
  IStoryOptionComponentOwnProps
> {
  public readonly render = () => (
    <StoryOptionsList
      getBreadcrumbProps={this.props.getBreadcrumbProps}
      className={classnames(styles.soundPanelContainer, 'soundPanelContainer')}
      title="Sound options"
      treeSelector={this.props.treeSelector}
    >{[
      <SoundManagerAudioPanel key={0} />
    ]}</StoryOptionsList>
  );
}

const option: IStoryOption = {
  content: SoundManagerOption,
  name: 'sound-manager-option',
};

export default option;
