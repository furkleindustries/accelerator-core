import {
  styles,
  IPassage,
  Link,
  React,
  IPassageProps,
} from '../src/passages/bundle';

class Component extends React.PureComponent<IPassageProps> {
  public render() {
    const {
      storyState,
    } = this.props;

    return (
      <div className={`${styles.passage} passage`} id="%NAME%">
      </div>
    );
  }
}

const passage: IPassage = {
  /* string: the story-unique name of the passage. */
  name: '%NAME%',
  
  /* string: an optional expanded title for the passage to be printed
   * each time a passage is displayed. */
  title: '',
  
  /* array: an optional collection of either plain strings or
   * { key: string, value: string, } objects. */
  tags: [],

  /* ComponentClass | ReactElement: the content that should be displayed, or,
   * in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;
