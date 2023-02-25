import {
  paths,
} from '../paths';

export function getEntry(mode) {
  if (mode === 'development') {
    return [
      /* Include an alternative client for WebpackDevServer. A client's job is
       * to connect to WebpackDevServer by a socket and get notified about
       * changes. When you save a file, the client will either apply hot
       * updates (in case of CSS changes), or refresh the page (in case of JS
       * changes). When you make a syntax error, this client will display a
       * syntax error overlay. Note: instead of the default WebpackDevServer
       * client, we use a custom one to bring better experience for Create
       * React App users. You can replace the line below with these two lines
       * if you prefer the stock client:
       * require.resolve('webpack-dev-server/client') + '?/',
       * require.resolve('webpack/hot/dev-server'), */
      require.resolve('./fixedWebpackHotDevClient'),
      /* Finally, this is the story's code entry point.
       * We include the app code last so that if there is a runtime error
       * during initialization, it doesn't blow up the WebpackDevServer client,
       * and changing JS code would still trigger a refresh. */
      paths.appIndex,
    ];
  } else {
    // In production, we only want to load the app code.
    return [ paths.appIndex ];
  }
}
