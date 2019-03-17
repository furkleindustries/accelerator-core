export function getAuthoredAssetObjectDefinitions(files) {
  return files.map((path, index) => (
    `  {\n` +
    `    asset: import_${index},\n` +
    `    filepath: \`${path}\`,\n` +
    `  },`
  ));
}
