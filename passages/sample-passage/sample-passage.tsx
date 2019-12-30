/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* Accelerator components, interfaces, functions, etc. Feel free to destructure
 * these as you see fit. */
import {
  AuthoringPassageContainer,
} from '../../bundles/componentsBundle'; 
import {
  IPassage,
  IPassageProps,
} from '../../bundles/passagesBundle';
import {
  BuiltInTags,
} from '../../bundles/tagsBundle';

import AuthoringPassage from './sample-passage.mdx';

class Passage extends React.PureComponent<IPassageProps> {
  constructor(props: IPassageProps) {
    super(props);
  
    const {
      setStoryState,
      soundManager: {
        collection: {
          addSound,
          hasIntentToAddSound,
          hasSound,
        },
      },
    } = this.props;

    setStoryState({
      soundLoaded: false,
      soundPlaying: false,
      counter: 0,
    });

    if (hasIntentToAddSound(this.soundName)) {
      return;
    } else if (hasSound(this.soundName)) {
      setStoryState({ soundLoaded: true });
    } else {
      /* TODO: add some sort guard against adding multiple identical sounds at the same time. */
      addSound(
        this.soundName,
        'https://s3.amazonaws.com/furkleindustries-accelerator/Zymbel_The_Real_Horst-1113884951.mp3',
      ).then(
        () => setStoryState({ soundLoaded: true }),
        (err) => { throw err; },
      );
    }
  }

  public render = () => (
    <AuthoringPassageContainer passageProps={this.props}>
      <AuthoringPassage />
    </AuthoringPassageContainer>
  );
 
  private soundName = 'sample';
}

const passage: IPassage = {
  /* string: the story-unique name of the passage. */
  name: 'sample-passage',

  /* array: an optional collection of either plain strings or
   * { key: string, value: string, } Tag objects. */
  tags: [
    /* Mark the passage as the first that should be rendered when the story is
     * started. */
    BuiltInTags.Start,

    /* Tags can also be added as key-value pairs. */
    {
      key: 'anotherTag',
      value: 'anotherTagValue',
    },
  ],

  /* React.ComponentType<IPassageProps>: the content that should be
   * displayed. */
  content: Passage,
};

/* Always make the passage object a default export. */
export default passage;
