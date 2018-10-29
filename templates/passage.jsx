/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import * as bundle from '../../src/passages/bundle';

class Component extends React.PureComponent {
  render() {
    const {
      lastLinkTags,
      passageObject,
      setStoryState,
      storyState,
    } = this.props;

    return (
      <div
        className={`${bundle.styles.passage} passage`}
        id={passageObject.name}
      >
      </div>
    );
  }
}

const passage = {
  /* string: the story-unique name of the passage. */
  name: '%NAME%',
  
  /* string: an optional expanded title for the passage to be printed
   * each time a passage is displayed. */
  title: '',
  
  /* array: an optional collection of either plain strings or
   * { key: string, value: string, } objects. */
  tags: [],

  /* ComponentClass<IPassageProps, any> | SFCFactory<IPassageProps>:
   * the content that should be displayed, or, in the case of noRender
   * passages, a component that can be imported. Should be formatted in JSX
   * style. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;
