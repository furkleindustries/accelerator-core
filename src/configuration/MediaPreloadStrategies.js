import {
  getFrozenObject,
} from '../functions/getFrozenObject';

// Did you remember to change MediaPreloadStrategies.d.ts?

export const MediaPreloadStrategies = getFrozenObject({
  // Preloads an image in full.
  PreloadFull: 'preload',

  // Pre-emptively opens a connection to the domain on which the image is served.
  Preconnect: 'preconnect',

  // Probably not useful unless you've added routing. This only preloads for
  // the next navigation.
  Prefetch: 'prefetch',

  // Used to load images during the game load procedure, not at page load. This
  // should be used for any images which are used _after_ the loading screen.
  PreloadDeferred: 'deferred',

  // Attempts no preloading at all.
  None: 'none',
});
