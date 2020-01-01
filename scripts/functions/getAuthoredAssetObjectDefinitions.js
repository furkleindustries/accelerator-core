export const getAuthoredAssetObjectDefinitions = (files) => (
  files.map((path, index) => (
    `  {\n` +
    `    asset: import_${index},\n` +
    `    filepath: \`${path}\`,\n` +
    `  },`
  ))
);
