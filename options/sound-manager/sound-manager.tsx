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
  IStoryOption,
} from '../../src/storyOptions/IStoryOption';
import {
  SoundManagerAudioPanel,
} from '../../src/components/SoundManagerAudioPanel/SoundManagerAudioPanel';

import * as React from 'react';

import styles from './sound-manager.scss';
import { StoryOptionsList } from '../../src/components/StoryOptionsList/StoryOptionsList';

const SoundManagerOption: React.FunctionComponent<
  IStoryOptionComponentOwnProps
> = () => (
  <StoryOptionsList
    className={classnames(styles.soundPanelContainer, 'soundPanelContainer')}
    optionPropName="Sound options"
  >{[
    <SoundManagerAudioPanel />
  ]}</StoryOptionsList>
);

const option: IStoryOption = {
  content: SoundManagerOption,
  name: 'sound-manager-option',
  optionPropName: null,
};

export default option;
