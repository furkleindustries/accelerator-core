export function getAuthoredAssetObjectDefinitions(files, propName) {
  return files.map((path, index) => (
    `  {\n` +
    `    filepath: \`${path}\`,\n` +
    `    ${propName}: import_${index},\n` +
    `  },`
  ));
}
