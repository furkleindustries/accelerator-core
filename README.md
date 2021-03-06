# accelerator-core

[![Build Status](https://travis-ci.org/furkleindustries/accelerator-core.svg?branch=master)](https://travis-ci.org/furkleindustries/accelerator-core)

A lightweight, reactive hypertext fiction framework with the conveniences of modern web dev and few of the pain points. This repository is the framework's runtime, which is more or less what is generated for you when you use the Accelerator devtool ([git repository](https://github.com/furkleindustries/accelerator-tool), [npm package](https://npmjs.com/package/accelerator-tool)) to create a new Accelerator project.

![Accelerator speedometer logo](https://s3.amazonaws.com/furkleindustries-accelerator/logo_320px.png "Accelerator speedometer logo")


## Table of contents
1. [Why Accelerator?](#why-accelerator)
1. [Installation](#installation)
1. [Creating passages](#creating-passages)
1. [The bundle imports](#bundle-imports)
    * [The components bundle](#components-bundle)
    * [The passages bundle](#passages-bundle)
    * [The plugins bundle](#plugins-bundle)
    * [The tags bundle](#tags-bundle)
1. [The passage object](#passage-object)
    * [Values](#passage-object-values)
    * [Functions](#passage-object-functions)
1. [Development server](#development-server)
1. [Testing your story](#testing)
1. [Publishing your story for release](#building-for-release)
1. [Headers and footers](#headers-and-footers)
1. [Plugins](#plugins)
1. [Configuration](#configuration)
1. [Templates](#templates)
1. [Acknowledgements](#acknowledgements)


<a name="why-accelerator"></a>

## Why Accelerator?
Accelerator was motivated by my desire to make [Twine](http://twinery.org/)-style hypertext stories with the convenience and power of bleeding-edge web technologies and a fully-featured IDE. As such, it is probably a poor fit for someone who is not already a web programmer or doesn't wish to learn things like a command-line shell, [React](https://reactjs.org/), or the modern JavaScript module system.

It is, however, a good choice if you want many or all of the following:

* A fast, efficienct, reactive runtime
* Content authoring in Markdown with simple access to React components and JavaScript logic
* A fully hot-reloading dev environment
* Simple usage and full interoperation with Inkle's Ink programming toolkit, as well as the ability to inject React components
* Ability to script, at nearly every content level, in JavaScript (or, by default, TypeScript in codefiles), rather than a special-purpose hypertext fiction language
* Type-safe and detailed usage of TypeScript, for automatic code hinting of nearly all assets, and optional usage of TypeScript for test files 
* Fully-customizable templates for tool-generated assets
* A boilerplate library, not a framework, so you have freedom to edit whatever you like of all generated code, as well as same-as-usual access to installed packages and the whole of `npm`
* Unintrusive default styling, with only a one-line change needed to remove default styling from almost all built-ins
* First-class access to wrappers for a full Material Design component library
* LESS/CSS Modules and automatic browserslist-driven refactoring of styles
* Prerendering of state and start passage
* Simple component, function, and story content reuse
* Access to a broad range of sound tools and user-facing options
* Blazingly fast, simple, locally-loaded access to any Google Font, with autogenerated, subsetted first-load rendering logic
* Accessible-by-design user experience
* Minification of authored content and bundles ~50% as large as a Twine project of equivalent size
* Automatic Electron packaging for multiple desktop executable OS targets
* Publish-time type-checking, unit testing, and integration testing on all story content, through a unified interface
* Access to feature-rich, proven Node.js test frameworks
* Built-in linting
* Quick prototyping of new passages and other 

and other such modern conveniences. Seriously, though, if what you want is to make a cool piece of interactive fiction, and not a bleeding-edge, industrial-quality web application which accomplishes the same, just use something else. This is not a magic bullet. It is rather a series of devtools, primitives, and build toolchains intended to make development of web-first interactive fiction more efficient and powerful for users who prefer command lines and code IDEs. Accelerate was built to interoperate best with Visual Studio Code, a free and open-source editor by Microsoft available [here](https://code.visualstudio.com/), but it will be nearly as powerful in any new IDE intended for web development.


<a name="installation"></a>

## Installation
In a command-line shell of your choice (assuming it has a modern version of `npm`/`npx`), do either:

`npm install -g accelerator-tool`

to install the tool to your environment, then:

`xlr8r create %YOUR_STORY_NAME%`

where `%YOUR_STORY_NAME%` should be replaced by the obvious, or:

`npx accelerator-tool create %YOUR_STORY_NAME%` to download a temporary copy of the tool and execute it once.

After a minute or so, the installation should be complete, and a folder named `%YOUR_STORY_NAME%` will be in the specified directory.


<a name="creating-passages"></a>

## Creating passages
An Accelerator story is notionally similar to a Twine story: it is a series of passages, joined by links. Each of these passages are TypeScript or JavaScript files which traditionally render one or more Markdown-React file, parsed by [mdx]. They contain a small amount of metadata and React component constructor (either a class implementing React.Component or React.PureComponent, or a stateless functional component) or a React element. Each is placed in the `passages` directory.

To write a new passage, either use `xlr8r new passage %YOUR_PASSAGE_NAME%`, or manually create a code file (ending in `.jsx` or `.tsx`) within the passages directory. A complete passage file will look something like [this](/passages/start/start.tsx).

The exported object must be the passage object, and it must be the default export. You can use any valid JSX, including functional and class-based components. You may use any named export for whatever you please. You may also feel free to organize your files however you please, as Accelerator will search any number of folders deep within the `passages` folder.

Note that passage files *must* end in `.jsx` or `.tsx`. This is convenient because it fits VS Code's syntax highlighting for files containing JSX elements, and also because it reserves all `.js` or `.ts` files for you to use and import as you see fit. Additionally, no files or folders in the base directory beginning with `_` will be processed as passages.

If you are using TypeScript (allowing for the full value of Accelerator's built-in functionalities), you should indicate the type of the passage object by replacing `const passage =` with `const passage: passagesBundle.IPassage =`, and setting the props type of the React component to `passagesBundle.IPassageProps`, importing these interfaces from `..//src/passages/passagesBundle`. This will allow full type-checking of your story passages. (You can also just destructure the bundle, or the passages property, so that you can refer directly to `IPassage` and `IPassageProps`.)


<a name="bundle-imports"></a>

## The bundle imports
All Accelerator passages have simple access to the bundle imports, located in `bundles/`. (Note that `passages` and `src/passages` are different folders with wholly different purposes.) Each bundle import is typically imported as so: `import * as passages from '../../bundles/passages';`. There are at present four export bundles intended for common author reuse:


<a name="components-bundle"></a>

### componentsBundle
* The [Link](/src/components/Link/Link.md) component, which allows the user to navigate between passages.
* The [If](/src/components/If/If.md) component, which allows conditional logic without top-level JavaScript in Markdown-React.
* The [ElseIf](/src/components/ElseIf/ElseIf.md) component, used as a child of `If`.
* The [Else](/src/component/Else/Else.md) component, used as a child of `If`.
* The [Iterator](/src/component/Iterator/Iterator.md) component, used for rendering a collection of generic items to the page. A more compact and no-scripting-needed template-language-style for loops. Allows a filter pre-pass and a mapping post-pass.
* The [Iterated](/src/component/Iterated/Iterated.md) component, used as a child of `Iterator`. Uses no children and no props, and acts as a stand-in value to be replaced within the results list by each successive item in the collection.
* The [ClickAppend](/src/components/ClickAppend/ClickAppend.md) component, which places one piece of content after another once the first component is clicked.
* The [ClickDisappear](/src/components/ClickDisappear/ClickDisappear.md) component, which causes a piece of content to disappear (or fade out over a specified duration) after it is clicked.
* The [ClickPrepend](/src/components/ClickPrepend/ClickPrepend.md) component, which places one piece of content before another after the first component is clicked.
* The [ClickReplace](/src/components/ClickReplace/ClickReplace.md) component, which replaces one piece of content with another after the first component is clicked.
* The [Clicker](/src/components/Clicker/Clicker.md) component, which is a lower-level component allowing one to show one portion of content before it is clicked, and another after. This is used to implement all the other `Click*` components. 
* The [Combination](/src/components/Combination/Permutation.md) component, which allows selecting a random, contiguous slice of a collection, e.g. `bar` and `baz` from `[ 'foo', 'bar', 'baz', 'bux', ]`.
* The [CyclingLink](/src/components/CyclingLink/CyclingLink.md) component, which allows the user to select between several string options, and optionally stores the choice in a variable.
* The [Cycler](/src/components/Cycler/Cycler.md) component, which is a lower-level component used by `CyclingLink`, allowing cycling between any pieces of content (not just strings as with `CyclingLink`), and aditionally accepts a callback which is fired when cycles are performed.
* The [Delay](/src/components/Delay/Delay.md) component, which delays rendering of content (or it being opaque) for an arbitrary period.
* The [FadeIn](/src/components/FadeIn/FadeIn.md) component, which increases the opacity of content from invisibility to full opacity over an arbitrary period.
* The [OneOf](/src/components/OneOf/OneOf.md) component, which randomly selects a single item from the collection passed as children.
* The [NOf](/src/components/NOf/NOf.md) component, which is a lower-level component used by `OneOf`, and allows any random number (but not random order) of its children to be displayed.
* The [Permutation](/src/components/Permutation/Permutation.md) component, which randomly shuffles the collection passed as children, and allows picking a slice of the contents.


<a name="passagesBundle"></a>

### passagesBundle:
* `IPassage`, an interface detailing the properties of the passage object, which is the default export of all passage files.
* `IPassageProps`, an interface detailing the properties passed to the `content` property of the passage object, assuming `content` is a React component.
* `builtInStyles`, an CSS modules object containing the classes and IDs defined in the passage's base stylesheet (located at [/src/passages/passage.less]). This could be automatically used/injected, but I intend on making it as easy as possible to do without default styling. This may change in the future. 
* `tagsBundle`:
* `BuiltInTags`, an enum which expresses the tags already configured for use by the Accelerator runtime.
* `getTag`, a function which accepts a tag array and desired key, and produces either `true` if the key was in the array as a plain string, or the value string if the key was the key property of a key-value tag.
* `Tag`, the type alias for tags.

There is also the [pluginsBundle](/src/passages/pluginBundle.ts), which contains interfaces for plugins and the `DebugPlugin`, and the [actionsBundle](/src/passages/actionsBundle.ts), which contains Redux action interfaces and creator functions, if you want to e.g. manually dispatch built-in Accelerator actions with the `dispatch` function.


<a name="passage-object"></a>

## The passage object
For each passage, your ES6 class component (extending `React.Component` or `React.PureComponent`), or functional component (of type `React.FunctionComponent`), or React's new stateful functional component types, will be passed relevant passage props automatically by the higher-order `PassageContainer` component. These props, defined in [`IPassageProps`](/src/passages/IPassageProps.ts) and [`IPassageFunctions`](/src/passages/IPassageFunctions.ts), are as follows:


<a name="passage-object-values"></a>

### Values
* `config`, a normalized copy of the Accelerator configuration file as it existed at build-time. This is of type `IAcceleratorConfigNormalized`.
* `passageObject`, the object from your authored passage file. This is of type `IPassage`.
* `storyState`, a copy of the story state. Due to the way Redux and its bindings update components, this object will always be up-to-date, relative to the actual, hidden state store, and changes to it are pointless. If you want to change the story state, use `setStoryState`.
* `lastLinkTags`, a list of any tags which were attached to the link (or programmatic, "off-screen" equivalent) which caused the previous passage navigation action.
* `soundManager`, a full installation of [sound-manager](https://github.com/furkleindustries/sound-manager), along with bindings to simply produce user-facing options affecting individual sounds or channels.


<a name="passage-object-functions"></a>

### Functions
* `setStoryState`, accepting an object of new state keys and values object as its single argument. This will automatically update the state and any rendered instances of it.
* `navigateTo`, which allows passage navigation actions without the need for user-facing `Link` components.
* `bookmark`, which produces a new rewind point in the story.
* `rewind`, which moves the story back a single passage in the history, and whatever number of timing ticks occurred on the current passage.
* `restart`, which restarts the entire story and deletes all state whatsoever from a playthrough.
* `dispatch`, a no-complexity wrapper of the Redux state store's `dispatch` function, allowing lower-level dispatching of Redux actions. This will likely not be useful unless you're doing some sort of notional reflection with the Accelerator internals, or you're authoring your own actions and have modified the default state store accordingly.


<a name="development-server"></a>

## Development server
Accelerator includes many facilities to increase development velocity. Its development server comes bundled with hot-reloading, error reporting, and linting. In order to start the development server, run `npm run start`. Note that you may need to shut down and restart the dev server if you add or remove a passage file. Otherwise, anything you change in your code should, to some extent, be reflected in the browser without the need for refreshes, renavigation, or story restarts. See [Reasons to restart the dev environment](/documentation/reasons-to-restart-dev-environment.md) for more details on what *doesn't* work well with hot reloading.


<a name="testing"></a>

## Testing your story
Accelerator uses [Jest](https://jestjs.io) for testing. Basic tests are placed in each passage folder when a passage is generated by `accelerator-tool`, and these should be added to validate any necessary logic or behavior. You should additionally, as a matter of good practice, write tests for any additional functions you write for your story.

You can run tests using `npm run test`. By default, tests are only executed if they or the files they cover have changed since the last commit. They are also run by default in watch mode, which updates whenever you save a file under test coverage. You can run the tests outside of watch mode with `npm run test -- --dontWatch`. You may additionally generate a full test coverage document (created by Jest using [Istanbul](https://istanbul.js.org/)) by appending the `--coverage` option, like so: `npm run test -- --dontWatch --coverage`.


<a name="building-for-release"></a>

## Building your story for release
To build the code bundle and HTML file for release on the web, run `npm run build`. After this completes, the relevant files will be in `build-web`. If you would also like to automatically create Electron desktop executables from your story, run `npm run build-with-desktop`. Note that for technical reasons regarding Windows' treatment of symlinks when unzipping archives, it is not possible (as of 10/18) to build macOS executables on Windows machines. If you need a macOS executable, you can use this library on macOS or any Linux. The executables will be in distribution-specific folders in `build-desktop`.


<a name="configuration"></a>

## Configuration
Many configuration semantics can be altered through the Accelerator config file. The default configuration file is located at [accelerator.config.js](/accelerator.config.js), and is heavily commented. I have additionally reproduced the type signature of the configuration file below. Note that this is *not* the type signature of the normalized configuration provided at runtime to the Accelerator engine, which is represented by [IAcceleratorConfigNormalized](/src/configuration/IAcceleratorConfigNormalized). Note that the `debug` variable will cause significant changes in what is rendered to the screen, what sort of console messages are emitted, and potentially the performance of your application. This value is ignored when publishing; it is not possible to publish a debug version of the story with the toolchain, and means to make stats or debug-oriented builds through lower-level Webpack invocations are provided in scripts.

```typescript
interface IAcceleratorConfig extends Record<string, any> {
  readonly coreVersion: string;
  readonly debug: boolean;
  readonly historyStackLimit: number;
  readonly historySaveTypes: OneOrMaybeReadonlyArray<string | ActionTypes>
  readonly historySynchronizeUnrewindableStateWithPresent: boolean;
  readonly publicUrl: string;
  readonly rendererName: BuiltInRenderers | string;
  readonly showMenu: boolean;
  readonly storyDescription: string;
  readonly storyTitle: string;
  readonly toolVersion: string;
  readonly fontsToLoad?: OneOrMaybeReadonlyArray<IFontLoadingDetails | string>;
  readonly subsetFont?: IFontSubsettingDetails | string;
}
```

More information specifically on how to alter and override the default rendering semantics in Accelerator is located [here](/documentation/renderers.md ).


<a name="headers-and-footers"></a>
## Headers and footers

You can instruct Accelerator to render specific pieces of content below or above each passage using headers and footers, respectively. Use the following `xlr8r` command to create a new header:

`xlr8r new header my-cool-header`

and a new footer:

`xlr8r new footer my-cool-header`.

Headers and footers are stored in the `headers/` and `footers/` directories, analogously to how passages are stored in `passages/`. You may also generate 

Construction of headers and footers is largely identical to the construction of passages, though headers and footers do not have tags of any kind. Both templates have an extra argument in the default export object, `precedence`, which allows you to control the order in which headers and footers are rendered to the page. For example, a header with precedence of `4` will always be rendered above an header with precedence `3`. Headers and footers with no precedence property are rendered last. All headers and footers of the same precedence level are further sorted in lexicographic order. So, for example, a footer with precedence `3` and the name `aardvark` will be rendered above a footer with precedence `3` and the name `badger`, whereas `badger` would be rendered first if it was of precedence `5`.


<a name="plugins"></a>

## Plugins
Accelerator also allows the use of plugins, which hook into lifecycle events in the Accelerator rendering and state cycles. The available lifecycle methods are as follows:

* `afterStoryInit`
* `beforePassageChange`
* `beforeRender`
* `afterPassageChange`
* `afterStoryStateChange`
* `beforeRestart`

Accelerator comes bundled with a single plugin, [DebugPlugin](/src/plugins/DebugPlugin.tsx), which is included automatically in the plugin stack if you are running the development server and the `debug` property has been set to `true` in the Accelerator config file. You may also consult the [template](/templates/plugins/plugin.tsx) (JavaScript version [here](/templates/plugins/plugin.jsx)) for further details on which methods receive which arguments.

Plugins follow the same precedence rules as headers and footers, and are stored in the `plugins/` directory.

One important note is that, while it is generally true the `beforeRender` method fires once and only once per passage navigation, this cannot be guaranteed. Therefore, try to assume this method may be called any number of times, and try to keep the logic there pure and separate from state mutation. If you want or need to update state within this method, try to be sure that the values are updated idempotently. That is, in pseudocode terms, `set x to 5`, rather than `set x to x + 1`, because the former will produce the same result no matter how many times it is performed, and the latter will not. Failing to abide this recommendation will likely result in confusing game-side behavior and complex debugging.


<a name="templates"></a>

## Templates
The Accelerator devtool ([`accelerator-tool`](https://github.com/furkleindustries/accelerator-tool), aliased in installations and documentation as `xlr8r`) uses templates to construct new passages. These templates are stored locally in [`src/templates`](/src/templates). Feel free to modify them as you see fit. Note that, given the inherent problems which result from using a strictly typed codefile as a template, there may be some linting errors in these templates, and cannot be tested or linted like normal codefiles. You may avoid these through liberal usage of `// @ts-ignore`, but be aware that this will be copied into your template-built passages, and potentially conceal real issues later on.

There is also automatic rewriting of templated files generated by `xlr8r new` based on some values in the configuration, most notably `publicUrl`, which is used to build URLs correctly for installations on non-root server URLs, as well as `storyTitle` and `storyDescription`, which do what they sound like. 


<a name="acknowledgements"></a>
## Acknowledgements

Like any software project, Accelerator is influenced by and indebted to the software I have used and enjoyed over the past couple years. The most prominent of those are:

* *React*, for its simple, fully-scriptable componenting and gracefully reactive view engine.
* *Redux*, for providing elegant solutions for inversion of control and pure componenting in *React*.
* *create-react-app*, a similarly-focused one-command prototype solution.
* *mdx*, for its simple usage of Markdown within React and simple intermixing of the two forms.
* *Ink*, a narrative middleware by Inkle Studios, and its focus on always-forward narrative control flow, clean syntax, and simple refactoring.
* *glyphhanger*, by Zack Leatherman, as well as *fonttools*, which *glyphhanger* utilizes, and Zack Leatherman's broad writings on efficient font loading.
* *Twine*, which formed the basic notion of the story graph implemented here, with nodes connected by user-clickable links. *Twine*'s programming languages, called "story formats," and the extensions to it produced by its community in modules and games, provided many of the ideas for built-in components found here.
* *Angular* (and to a lesser extent *Django*), for the concept of an adjacent tool which allows quick creation, prototyping, and testing of new project assets.
* *Windrift*, by Liza Daly, for the kick in the butt I finally needed to make the React-Redux IF toolkit I'd been dreaming of since I felt I hit the ceiling on *Twine*.

The first six of these are also used extensively within Accelerator.
