import classNames from 'classnames';
import {
  AppContextConsumerWrapper,
  SoundManagerView,
  StoryOptionsList,
} from '../../bundles/componentsBundle';
import {
  IStoryOptionComponentOwnProps,
} from '../../src/storyOptions/IStoryOptionComponentOwnProps';
import {
  IStoryOption,
} from '../../src/storyOptions/IStoryOption';

import * as React from 'react';

import styles from './sound-manager.less';

const Option: React.FC<IStoryOptionComponentOwnProps> = ({
  clickOption,
  crumb,
  ...props
}) => (
  <AppContextConsumerWrapper>
    {({ getSoundManager }) => (
      <StoryOptionsList
        {...props}

        className={classNames(
          styles['sound-panel-container'],
          'sound-panel-container',
        )}

        clickOption={clickOption}
        crumb={crumb}
        role="menu treeitem"
        title="Sound Manager"
      >
        <SoundManagerView
          getSoundManager={getSoundManager}
          key="sound-manager"
        />
      </StoryOptionsList>
    )}
  </AppContextConsumerWrapper>
);

const option: IStoryOption = {
  content: Option,
  name: 'sound-manager-option',
  precedence: 2,
};

export default option;
