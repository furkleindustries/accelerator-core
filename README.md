![Accelerator speedometer logo](https://s3.amazonaws.com/furkleindustries-accelerator/logo_320px.png "Accelerator speedometer logo")

[![Build Status](https://travis-ci.org/furkleindustries/accelerator-core.svg?branch=master)](https://travis-ci.org/furkleindustries/accelerator-core)

# accelerator-core

A lightweight, reactive hypertext fiction framework with the conveniences of modern web dev and few of the pain points. This repository is the framework's runtime, which is more or less what is generated for you when you use the Accelerator devtool ([git repository](https://github.com/furkleindustries/accelerator-tool), [npm package](https://npmjs.com/package/accelerator-tool)) to create a new Accelerator project.

## Table of contents

1. [Why Accelerator?](#why-accelerator)
2. [Installation](#installation)
3. [Creating passages](#creating-passages)
4. [The bundle imports](#bundle-imports)
5. [The contents component class/function](#contents-component-creator)
6. [Headers and footers](#headers-and-footers)
7. [Development server](#development-server)
8. [Testing your story](#testing)
9. [Building your story for release](#building-for-release)
10. [Configuration](#configuration)
11. [Templates](#templates)
12. [Plugins](#plugins)
13. [Acknowledgements](#acknowledgements)

<a name="why-accelerator"></a>
## Why Accelerator?

Accelerator was motivated by my desire to make [Twine](http://twinery.org/)-style hypertext stories with the convenience and power of bleeding-edge web technologies and a fully-featured IDE. As such, it is probably a poor fit for someone who is not already a web programmer or doesn't wish to learn things like a command-line shell, [React](https://reactjs.org/), or the modern JavaScript module system.

It is, however, a good choice if you want any of the following:

* A fast, simple, reactive runtime
* Scripting in JavaScript/TypeScript rather than a special-purpose hypertext fiction language
* Sass/CSS modules
* Prerendering of state and start passage
* Simple component and function reuse
* Minification of authored content and bundles ~50% as large as a Twine project of equivalent size
* Automatic Electron packaging
* Type-checking
* Access to pre-existing, proven test frameworks
* A hot-reloading dev environment
* Built-in linting
* Quick prototyping of new passages

and other such modern conveniences.

<a name="installation"></a>
## Installation

In a command-line shell of your choice (assuming it has a modern version of `npm`/`npx`), do either:

`npm install -g accelerator-tool`

to install the tool to your hard drive, then:

`accelerator-tool create %YOUR_STORY_NAME%`

where `%YOUR_STORY_NAME%` should be replaced by the obvious, or:

`npx accelerator-tool create %YOUR_STORY_NAME%` to download a temporary copy of the tool and execute it once.

After a minute or so, the installation should be complete, and a folder named `%YOUR_STORY_NAME%` will be in the specified directory.

<a name="creating-passages"></a>
## Creating passages

An Accelerator story is notionally similar to a Twine story: it is a series of passages, joined by links. Each of these passages are TypeScript or JavaScript files. They contain a small amount of metadata and React component constructor (either a class implementing React.Component or React.PureComponent, or a stateless functional component) or a React element. Each is placed in the `passages` directory.

To write a new passage, either use `accelerator-tool new passage %YOUR_PASSAGE_NAME%`, or manually create a code file (ending in `.jsx` or `.tsx`) within the passages directory. A complete passage file will look something like [this](/passages/start/start.tsx).

The exported object must be the passage object, and it must be the default export. You can use any valid JSX, including functional and class-based components. You may use any named export for whatever you please. You may also feel free to organize your files however you please, as Accelerator will search any number of folders deep within the `passages` folder.

Note that passage files *must* end in `.jsx` or `.tsx`. This is convenient because it fits VS Code's syntax highlighting for files containing JSX elements, and also because it reserves all `.js` or `.ts` files for you to use and import as you see fit.

If you are using TypeScript (allowing for the full value of Accelerator's built-in functionalities), you should indicate the type of the passage object by replacing `const passage =` with `const passage: passagesBundle.IPassage =`, and setting the props type of the React component to `passagesBundle.IPassageProps`, importing these interfaces from `../src/passages/passagesBundle`. This will allow full type-checking of your story passages. (You can also just destructure the bundle, or the passages property, so that you can refer directly to `IPassage` and `IPassageProps`.)

<a name="bundle-imports"></a>
## The bundle imports

All Accelerator passages have simple access to the bundle imports, located in `src/passages/`. (Note that `passages` and `src/passages` are different folders with wholly different purposes.) Each bundle import is typically imported as so: `import * as widgets from '../../src/passages/widgetsBundle';`. There are at present three export bundles intended for author reuse:

* `componentsBundle`:
  * The [Link](src/components/Link/Link.md) component, which allows the user to navigate between passages.
  * The [ClickAppend](src/components/ClickAppend/ClickAppend.md) component, which places one piece of content after another once the first component is clicked.
  * The [ClickDisappear](src/components/ClickDisappear/ClickDisappear.md) component, which causes a piece of content to disappear (or fade out over a specified duration) after it is clicked.
  * The [ClickPrepend](src/components/ClickPrepend/ClickPrepend.md) component, which places one piece of content before another after the first component is clicked.
  * The [ClickReplace](src/components/ClickReplace/ClickReplace.md) component, which replaces one piece of content with another after the first component is clicked.
  * The [Clicker](src/components/Clicker/Clicker.md) component, which is a lower-level component allowing one to show one portion of content before it is clicked, and another after. This is used to implement all the other `Click*` components. 
  * The [Combination](src/components/Combination/Permutation.md) component, which allows selecting a random, contiguous slice of a collection, e.g. `bar` and `baz` from `[ 'foo', 'bar', 'baz', 'bux', ]`.
  * The [CyclingLink](src/components/CyclingLink/CyclingLink.md) component, which allows the user to select between several string options, and optionally stores the choice in a variable.
  * The [Cycler](src/components/Cycler/Cycler.md) component, which is a lower-level component used by `CyclingLink`, allowing cycling between any pieces of content (not just strings as with `CyclingLink`), and aditionally accepts a callback which is fired when cycles are performed.
  * The [Delay](src/components/Delay/Delay.md) component, which delays rendering of content (or it being opaque) for an arbitrary period.
  * The [FadeIn](src/components/FadeIn/FadeIn.md) component, which increases the opacity of content from invisibility to full opacity over an arbitrary period.
  * The [OneOf](src/components/OneOf/OneOf.md) component, which randomly selects a single item from the collection passed as children.
  * The [NOf](src/components/NOf/NOf.md) component, which is a lower-level component used by `OneOf`, and allows any random number (but not random order) of its children to be displayed.
  * The [Permutation](src/components/Permutation/Permutation.md) component, which randomly shuffles the collection passed as children, and allows picking a slice of the contents.
* `passagesBundle`:
  * `IPassage`, an interface detailing the properties of the passage object, which is the default export of all passage files.
  * `IPassageProps`, an interface detailing the properties passed to the `contents` property of the passage object, assuming `contents` is a React component.
* `styles`, an CSS modules object containing the classes and IDs defined in the passage's base stylesheet (located at `src/passages/passage.scss`). This could be automatically used/injected, but I intend on making it as easy as possible to do without default styling. 
* `tagsBundle`:
  * `BuiltInTags`, an enum which expresses the tags already configured for use by the Accelerator runtime.
  * `getTag`, a function which accepts a tag array and desired key, and produces either `true` if the key was in the array as a plain string, or the value string if the key was the key property of a key-value tag.
  * `Tag`, the type alias for tags.

<a name="contents-component-creator"></a>
## The contents component class/function

For each passage, your ES6 class component (extending `React.Component` or `React.PureComponent`) or functional component (of type `React.StatelessFunctionalComponent`, or React's new stateful functional component types) will be passed props automatically by the higher-order `PassageContainer` component. These props, defined in `IPassageProps`, are as follows:

* `passageObject`, the object from your authored passage file. This is of type `IPassage`.
* `storyState`, a copy of the story state. Due to the way Redux and its bindings update components, this object will always be up-to-date, relative to the actual, hidden state store, and changes to it are pointless. If you want to change the story state, use `setStoryState`.
* `setStoryState`, a function accepting an object of new state keys and values object as its single argument. This will automatically update the state and any rendered instances of it.
* `bookmark`, a function which produces a new rewind point in the story.
* `dispatch`, a no-complexity wrapper of the Redux state store's `dispatch` function, allowing lower-level dispatching of Redux actions. This will likely not be useful unless you're doing some sort of notional reflection with the Accelerator internals, or you're authoring your own actions and have modified the default state store accordingly.

<a name="headers-and-footers"></a>
## Headers and footers

You can instruct Accelerator to render specific pieces of content below or above each passage using headers and footers, respectively. Use the following `accelerator-tool` command to create a new header:

`accelerator-tool new header my-cool-header`

and a new footer:

`accelerator-tool new footer my-cool-header`.

Headers and footers are stored in the `headers/` and `footers/` directories, analogously to how passages are stored in `passages/`. You may also generate 

Construction of headers and footers is largely identical to the construction of passages, though headers and footers do not have tags of any kind. They have an extra argument in the default export object, `precedence`, which allows you to control the order in which headers and footers are rendered to the page. For example, a header with precedence of 4 will be rendered above an header with precedence 3. Headers and footers with no precedence property are rendered last. All headers and footers of the same precedence level are further sorted in lexicographic order, so  a footer with precedence 3 and the name `aardvark` will be rendered above a footer with precedence 3 and the name `badger`.

<a name="development-server"></a>
## Development server

Accelerator includes many facilities to ease and speed development. Its development server comes bundled with hot-reloading, error reporting, and linting. In order to start the development server, run `npm run start`. Note that you may need to shut down and restart the dev server if you add or remove a passage file.

<a name="testing"></a>
## Testing your story

Accelerator uses [Jest](https://jestjs.io) for testing. Basic tests are placed in each passage folder when a passage is generated by `accelerator-tool`, and these should be added to validate any necessary logic or behavior. You should additionally, as a matter of good practice, write tests for any additional functions you write for your story.

You can run tests using `npm run test`. By default, tests are only executed if they or the files they cover have changed since the last commit. They are also run by default in watch mode, which updates whenever you save a file under test coverage. You can run the tests outside of watch mode with `npm run test -- --dontWatch`. You may additionally generate a full test coverage document (created by Jest using [Istanbul](https://istanbul.js.org/)) by appending the `--coverage` option, like so: `npm run test -- --dontWatch --coverage`.

<a name="building-for-release"></a>
## Building your story for release

To build the code bundle and HTML file for release on the web, run `npm run build`. After this completes, the relevant files will be in `build-web`. If you would also like to automatically create Electron desktop executables from your story, run `npm run build-with-desktop`. Note that for technical reasons regarding Windows' treatment of symlinks when unzipping archives, it is not possible (as of 10/18) to build macOS executables on Windows machines. If you need a macOS executable, you can use this library on macOS or any Linux. The executables will be in distribution-specific folders in `build-desktop`.

<a name="configuration"></a>
## Configuration

Basic configuration can be performed through the `.env` file. There are currently three values scraped from this file:

* `PUBLIC_URL`, which determines the URL of static resources like JS and CSS bundles, and you'll likely never have to change;
* `ACCELERATOR_STORY_TITLE`, which allows you to set the title of your story in the browser and Electron. This will appear in search engines.
* `ACCELERATOR_STORY_DESCRIPTION`, which allows you to set the description of your story in the browser. This will appear in search engines as well.

<a name="templates"></a>
## Templates

The Accelerator devtool (`accelerator-tool`) uses templates to construct new passages. These templates are stored locally in `src/templates`. Feel free to modify them as you see fit.

There is also automatic rewriting of templated files generated by `accelerator-tool new` based on the values in the `.env` file. Any value in that configuration file which begins with `ACCELERATOR_` will be conditionally injected into all rewritten content. Note that this does not apply to `PUBLIC_URL`, which is handled by the `Create React App` build system. An example of this kind of rewriting:

Any instances of `%FOO%` in a core source file which is rewritten and redistributed in an Accelerator story will be rewritten by the `.env` value for `ACCELERATOR_FOO`. Note that the `ACCELERATOR_` prefix must be omitted in files which are rewritten.

All instances of `%NAME%` are also rewritten with the name specified in the `package.json` file.

<a name="plugins"></a>
## Plugins

Accelerator also allows the use of plugins, which hook into lifecycle events in the Accelerator rendering and state cycles. The available lifecycle methods are as follows:

* afterStoryInit
* beforePassageChange
* beforeRender
* afterPassageChange
* afterStoryStateChange
* beforeRestart

Accelerator comes bundled with a single plugin, [DebugPlugin](./src/plugins/DebugPlugin.tsx), which is included automatically in the plugin stack if you are running the development server and the `ACCELERATOR_DEBUG` environment variable has been set to `true` in the `.env` file. You may also consult the [template](./templates/plugins/plugin.tsx) for further details on which methods receive which arguments.

Plugins follow the same precedence rules as headers and footers, and are stored in the `plugins/` directory.

<a name="acknowledgements"></a>
## Acknowledgements

Like any software project, Accelerator is influenced by and indebted to the software I have used and enjoyed over the past couple years. The most prominent of those are:

* React, for its simple componenting and graceful, reactive updates.
* Redux, for providing elegant inversion of control and pure componenting in React.
* create-react-app, a similarly-focused one-command prototype solution. 
* Twine, which formed the basic notion of the story graph implemented here, with nodes connected by user-clickable links, and additionally most of the ideas for built-in components found here.
* Angular (and to a lesser extent Django), for the concept of an adjacent tool which allows quick creation and prototyping of new project assets.

The first three of these are also extensively used within Accelerator.
