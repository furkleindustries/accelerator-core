import classnames from 'classnames';

import * as React from 'react';

import styles from './{{{name}}}.scss';

class Option extends React.PureComponent {
  render = () => {
    const {

    } = this.props;

    return (
      <div className={classnames(styles['{{{name}}}'])}>
        This is a story option.
      </div>
    );
  };
}

const option = {
  content: Option,
  name: '{{{name}}}',
};

export default option;
