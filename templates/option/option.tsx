import classNames from 'classnames';
import {
  IStoryOptionComponentOwnProps,
} from '../../src/storyOptions/IStoryOptionComponentOwnProps';
import {
  IStoryOption,
} from '../../src/storyOptions/IStoryOption';

import * as React from 'react';

import styles from './{{{name}}}.less';

class Option extends React.PureComponent<IStoryOptionComponentOwnProps> {
  public readonly render = () => {
    const {
      getBreadcrumbProps,
      open,
    } = this.props;

    return (
      <div className={classNames(
        styles['{{{name}}}'],
        'story-option',
      )}>
        This is a story option.
      </div>
    );
  };
}

const option: IStoryOption = {
  content: Option,
  name: '{{{name}}}',
};

export default option;
