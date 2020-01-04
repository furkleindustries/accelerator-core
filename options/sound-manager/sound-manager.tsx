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

const Option: React.FunctionComponent<
  IStoryOptionComponentOwnProps
> = ({
  getBreadcrumbProps,
  open,
  treeSelector,
  visibilityTree,
}) => (
  <StoryOptionsList
    getBreadcrumbProps={getBreadcrumbProps}
    className={classNames(styles.soundPanelContainer, 'soundPanelContainer')}
    title="Sound options"
    open={open}
    treeSelector={treeSelector}
    visibilityTree={visibilityTree}
  >
    {[ <SoundManagerAudioPanel key={0} /> ]}
  </StoryOptionsList>
);

const option: IStoryOption = {
  content: Option,
  name: 'sound-manager-option',
};

export default option;
