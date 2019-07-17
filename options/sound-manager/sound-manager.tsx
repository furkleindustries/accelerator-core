import classNames from 'classnames';
import {
  IStoryOptionComponentOwnProps,
} from '../../src/storyOptions/IStoryOptionComponentOwnProps';
import {
  IStoryOption,
} from '../../src/storyOptions/IStoryOption';
import {
  SoundManagerAudioPanel,
} from '../../src/components/SoundManagerAudioPanel';
import {
  StoryOptionsList,
} from '../../src/components/StoryOptionsList';

import * as React from 'react';

import styles from './sound-manager.less';

const SoundManagerOption: React.FunctionComponent<
  IStoryOptionComponentOwnProps
> = ({
  getBreadcrumbProps,
  treeSelector,
}) => (
  <StoryOptionsList
    getBreadcrumbProps={getBreadcrumbProps}
    className={classNames(styles.soundPanelContainer, 'soundPanelContainer')}
    title="Sound options"
    treeSelector={treeSelector}
  >{
    [ <SoundManagerAudioPanel key={0} /> ]
  }</StoryOptionsList>
);

const option: IStoryOption = {
  content: SoundManagerOption,
  name: 'sound-manager-option',
};

export default option;
