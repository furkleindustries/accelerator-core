/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import * as components from '../../src/passages/componentsBundle';
import * as passages from '../../src/passages/passagesBundle';
// @ts-ignore
import builtInStyles from '../../src/passages/styles.scss';

// @ts-ignore
import _styles from './menu.scss';
const styles = _styles || {};

/* The header gets all the same props as a normal passage. */
class Component extends React.PureComponent<passages.IPassageProps> {
  public render() {
    return (
      <div
        className={`${styles.menu} ${builtInStyles.header} header`}
      >
        <div className={styles.rewind}>
          <components.RewindButton>
            Rewind
          </components.RewindButton>
        </div>

        <div className={styles.restartContainer}>
          <components.RestartButton>
            Restart
          </components.RestartButton>
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
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;