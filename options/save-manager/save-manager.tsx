import {
  StoryOptionsList,
} from '../../bundles/componentsBundle';
import classNames from 'classnames';
import {
  ISaveManagerOptionStateProps,
} from './ISaveManagerOptionStateProps';
import {
  ISaveManagerOptionOwnProps,
} from './ISaveManagerOptionOwnProps';
import {
  IState,
} from '../../src/state/IState';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  IStoryOptionComponentOwnProps,
} from '../../src/storyOptions/IStoryOptionComponentOwnProps';
import {
  IStoryOption,
} from '../../src/storyOptions/IStoryOption';
import {
  StoryStateSaveLoadView,
} from '../../src/components/StoryStateSaveLoadView';

import * as React from 'react';

import styles from './save-manager.less';

const OptionUnconnected: React.FC<
  IStoryOptionComponentOwnProps &
    ISaveManagerOptionOwnProps &
    ISaveManagerOptionStateProps
> = ({
  clickOption,
  crumb,
  currentPassageName,
  currentSaveUuid,
  storyStateSavePointers,
  ...props
}) => (
  <StoryOptionsList
    {...props}

    className={classNames(
      styles['save-manager-container'],
      'save-manager-container',
    )}

    clickOption={clickOption}
    crumb={crumb}
    title="Save/Load"
  >
    <div
      className={classNames(
        styles['save-manager-option'],
        'save-manager-option',
      )}

      key="save-manager"
      role="group"
    >
      <StoryStateSaveLoadView />
    </div>
  </StoryOptionsList>
);

export const mapStateToProps: MapStateToProps<
  ISaveManagerOptionStateProps,
  IStoryOptionComponentOwnProps,
  IState
> = ({
  currentSaveUuid,
  history: {
    present: { passageName: currentPassageName },
  },

  storyStateSavePointers,
}) => ({
  currentPassageName,
  currentSaveUuid,
  storyStateSavePointers,
});

const Option = connect(mapStateToProps)(OptionUnconnected);

const option: IStoryOption = {
  content: Option,
  name: 'save-manager-option',
  precedence: 1,
};

export default option;
