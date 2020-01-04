/**
 * Some libraries import Node modules but don't use them in the browser.
 * Tell Webpack to provide empty mocks for them so importing them works.
 */
export const getEmptyNodeModulesMap = () => Object.freeze({
  child_process: 'empty',
  dgram: 'empty',
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
});
