export function getHotReloadAcceptor(importPaths) {
  return ( 
    '/* Needed for HMR and RHL functionality with authored assets. */\n' +
    'if (process.env.NODE_ENV === \'development\' && (module as any).hot) {\n' +
    '  (module as any).hot.accept([\n' +
    importPaths.map((path) => `    '${path}',\n`) +
    '  ]);\n' +
    '}'
  );
}
