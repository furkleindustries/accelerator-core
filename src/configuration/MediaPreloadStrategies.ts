// Did you remember to change MediaPreloadStrategies.js?

export enum MediaPreloadStrategies {
  // Preloads an media in full from page load.
  PreloadFull = 'preload',

  // Pre-emptively opens a connection on page load to the domain on which the
  // media is served.
  Preconnect = 'preconnect',

  // Probably not useful unless you've added routing. This only preloads for
  // the next navigation.
  Prefetch = 'prefetch',

  // Used to load media during the game load procedure, not at page load. This
  // should be used for any images which are used _after_ the loading screen.
  PreloadDeferred = 'deferred',

  // Attempts no preloading at all.
  None = 'none',
}
