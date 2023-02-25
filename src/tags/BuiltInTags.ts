import {
  createPreloadHint,
} from './createPreloadHint';

export const BuiltInTags = {
  // Preloads an external file at passage start.
  createPreloadHint,

  /* Determines whether the passage is not intended for rendering (good for
   * passages intended only to contain exported, reusable content), in which
   * case an error will be thrown if an attempt is made to navigate to it or
   * render it, and it will be exempted from validity check failures if it does
   * not contain a valid content property. */
  NoRender: {
    key: 'NoRender',
    value: true,
  },
};
