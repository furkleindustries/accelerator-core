# accelerator-core

## Summary

A lightweight, reactive hypertext fiction framework with the conveniences of modern web dev and few of the pain points. This repository is the framework's runtime, which is more or less what is generated for you when you use the [accelerator-tool](https://github.com/furkleindustries/accelerator-tool) library to create a new accelerator project. You probably don't want to clone this repository as it'll come with all the git data, whereas you'll want to be creating your own repository for tracking your own story.

## Installation

In a command-line shell of your choice (assuming it has a modern version of `npm`/`npx`), do either:

`npm install -g accelerator-tool`

to install the tool to your hard drive, then:

`accelerator-tool create %YOUR_STORY_NAME%`

where `%YOUR_STORY_NAME%` should be replaced by the obvious, or:

`npx accelerator-tool create %YOUR_STORY_NAME%` to download a temporary copy of the tool and execute it once.

After a minute or so, the installation should be complete, and a folder named `%YOUR_STORY_NAME%` will be in the specified directory.

## Usage

Either manually create passage files in the `passages/` directory, or use `accelerator-tool passage %YOUR_PASSAGE_NAME%`. A complete passage file will look something like this:

```javascript
import {
  IPassage,
  Link,
  React,
  IPassageProps,
} from '../src/passages/bundle';

import logo from '../public/logo.svg';

class Component extends React.PureComponent<IPassageProps> {
  constructor(props: any, context?: any) {
    super(props, context);

    /* Bind the function so we can properly access this.props. */
    this.clickIncrementor = this.clickIncrementor.bind(this);
  }

  public render() {
    const {
      storyState,
    } = this.props;

    return (
      <div id="myCoolPassage">
        <h2>
          This is the sample accelerator passage.
        </h2>

        <img
          src={logo}
          style={{
            display: 'block',
            width: '300px',
            margin: '0 auto',
            maxWidth: '60%',
          }}
        />

        {/* Move to new passages with the Link component. */}
        <Link passageName="testPassage2">
          This is a link.
        </Link>

        {/* This will update reactively, without the need for any rendering logic on your part. */}
        <div>{storyState.counter || 0}</div>

        <button
          onClick={this.clickIncrementor}
        >
          Clicking me increments the counter!
        </button>
      </div>
    );
  }

  private clickIncrementor() {
    const {
      setStoryState,
      storyState,
    } = this.props;

    setStoryState('counter', (storyState.counter || 0) + 1);
  }
}

const passage: IPassage = {/* string: the story-unique name of the passage. */
  /* string: the story-unique name of the passage. */
  name: 'myPassage',
  
  /* string: an optional expanded title for the passage to be printed
   * each time a passage is displayed. */
  title: 'My cool passage',
  
  /* array: an optional collection of either plain strings or
   * { key: string, value: string, } objects. */
  tags: [
    /* Mark the passage as the first that should be rendered when the story is started. */
    'start',
  
    {
      key: 'anotherTag',
      value: 'anotherTagValue',
    },
  ],

  /* ComponentClass | ReactElement: the content that should be displayed, or,
   * in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;
```

The exported object must be the passage object, and it must be the default export. Doing otherwise will break. You can use any valid JSX, including functional and class-based components.

If you are using Typescript (which you should be for the full value of accelerator's built-in functionalities), you should indicate the type of the passage object by replacing `const passage =` with `const passage: IPassage =`, and setting the props type of the React component to `IPassageProps`, importing these interfaces from `../src/passages/bundle`. This will allow full type-checking of your story passages.

In order to start the development server, run `npm run start`. Note that you may need to shut down and restart the dev server if you add or remove a passage file. To build the code bundle for release, run `npm run build`.