export const getHotReloadAcceptor = (importPaths) => ( 
  importPaths.length ?
    '/* Needed for HMR and RHL functionality with authored assets. */\n' +
      'if (process.env.NODE_ENV === \'development\' && (module as any).hot) {\n' +
    '  (module as any).hot.accept([\n' +
        importPaths.map((pathStr) => `    '${pathStr}',`).join('\n') +
        '\n' +
    '  ]);\n' +
    '}\n' :
  ''
);
