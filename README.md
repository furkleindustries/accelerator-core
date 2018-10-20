# accelerator-core

A lightweight, reactive hypertext fiction framework with the conveniences of modern web dev and few of the pain points. This repository is the framework's runtime, which is more or less what is generated for you when you use the [Accelerator devtool](https://github.com/furkleindustries/accelerator-tool) to create a new Accelerator project. You probably don't want to clone this repository as it'll come with all the git data, whereas you will want to create your own repository for tracking your story.

## Installation

In a command-line shell of your choice (assuming it has a modern version of `npm`/`npx`), do either:

`npm install -g accelerator-tool`

to install the tool to your hard drive, then:

`accelerator-tool create %YOUR_STORY_NAME%`

where `%YOUR_STORY_NAME%` should be replaced by the obvious, or:

`npx accelerator-tool create %YOUR_STORY_NAME%` to download a temporary copy of the tool and execute it once.

After a minute or so, the installation should be complete, and a folder named `%YOUR_STORY_NAME%` will be in the specified directory.

## Creating Passages

An Accelerator story is notionally similar to a Twine story: it is a series of passages, joined by links. Each of these passages are Typescript or Javascript files containing a small amount of metadata and either a React component or a React element, located in the `passages` directory.

To write a new passage, either use `accelerator-tool new passage %YOUR_PASSAGE_NAME%`, or manually create a code file within the passages directory. A complete passage file will look something like this:

```javascript
import {
  IPassage,
  IPassageProps,
  Link,
  React,
  styles,
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
          This is the sample Accelerator passage.
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
        <Link
          className={styles.link}
          passageName="testPassage2">
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

const passage: IPassage = {
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
  
    /* An arbitrary key-value tag to be consumed as you see fit. */
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

The exported object must be the passage object, and it must be the default export. You can use any valid JSX, including functional and class-based components. You can also feel free to organize your files however you please, as Accelerator will search any numbers of folders deep within the `passages` folder.

If you are using Typescript (which you should be for the full value of Accelerator's built-in functionalities), you should indicate the type of the passage object by replacing `const passage =` with `const passage: IPassage =`, and setting the props type of the React component to `IPassageProps`, importing these interfaces from `../src/passages/bundle`. This will allow full type-checking of your story passages.

## Developing stories

Accelerator includes many facilities to ease and speed development. Its development server comes bundled with hot-reloading, error reporting, and linting. In order to start the development server, run `npm run start`. Note that you may need to shut down and restart the dev server if you add or remove a passage file.

## Building your story for release

To build the code bundle and HTML file for release on the web, run `npm run build`. After this completes, the relevant files will be in `build-web`. If you would also like to automatically create Electron desktop executables from your story, run `npm run build-with-desktop`. Note that for technical reasons regarding Windows' treatment of symlinks when unzipping archives, it is not possible (as of 10/18) to build macOS executables on Windows machines. If you need a macOS executable, you can use this library on macOS or any Linux. The executables will be in distribution-specific folders in `build-desktop`.

## Configuration

Basic configuration can be performed through the `.env` file. There are currently three values scraped from this file:

* `PUBLIC_URL`, which determines the URL of static resources like JS and CSS bundles, and you'll likely never have to change;
* `ACCELERATOR_STORY_TITLE`, which allows you to set the title of your story in the browser and Electron. This will appear in search engines.
* `ACCELERATOR_STORY_DESCRIPTION`, which allows you to set the description of your story in the browser. This will appear in search engines as well.
