/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import {
  RestartButton,
  RewindButton,
} from '../../src/passages/componentsBundle';
import * as passages from '../../src/passages/passagesBundle';

import builtInStyles from '../../src/passages/styles.scss';
import styles from './menu.scss';

/* The header gets all the same props as a normal passage. */
class Menu extends React.PureComponent<passages.IPassageProps> {
  public render() {
    return (
      <div
        className={`${styles.menu} ${builtInStyles.header} header`}
      >
        <div className={styles.rewind}>
          <RewindButton>
            Rewind
          </RewindButton>
        </div>

        <div className={styles.restartContainer}>
          <RestartButton>
            Restart
          </RestartButton>
        </div>
      </div>
    );
  }
}

const passage: passages.IHeader = {
  /* string: the name of the header. */
  name: 'menu',

  /* ComponentClass<IPassageProps, any> | SFCFactory<IPassageProps>:
   * the content that should be displayed. Should be formatted in JSX style. */
  contents: Menu,
};

/* Always make the passage object a default export. */
export default passage;
