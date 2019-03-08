Nearly everything which is seen by the consumer of an Accelerator story (with the notable exception of content injected by plugins through `beforeRender` methods) was generated through a passage renderer. The passage renderer must match the signature of `IPassageRenderer`, and should ideally extend the abstract class `AbstractPassageRenderer`, which implements all methods but `render`.

The renderer has several primary objectives:

* Implement a `render` method which producse a rendered passage element as a pure function of the state represented in the `context` and `configuration` properties.
* Render one (and only one) `SkipToContentLinkDestination` destination above the most recently-navigated-to passage so as to allow non-pointer users to skip to the newest content from the top of the document.
* (By default) Render one or more `PassageContainer` components, passing relevant state and functions to the component(s).

Note that *pure* as referenced above refers to the render method not mutating application state or otherwise causing side effects in the application. (There are some default library and user-facing components, e.g. `CyclingLink`, which mutate state on render but don't worry about those.) This is not checked (and probably cannot be exhaustively checked) statically or at runtime, but it is an important concern to maintain when implementing a renderer.

There are two renderers which are included with Accelerator. The first, and default, is the `SinglePassageRenderer`. This renderer shows the current passage, much like a typical Twine story does. When you navigate to a new passage, the old passage disappears and the new passage appears in its place. The other is the `ScrollRenderer`. This is closer in behavior (and default appearance) to an Ink story, or a story using the `Jonah` story format for Twine 1, and shows the previously-seen passages like a scroll unfurled above the current passage. The latter is currently unstable and under development.