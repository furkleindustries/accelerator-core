module.exports = function getPassageObjectDefinitions(files, propName) {
  return files.map((path, index) => (
    `  {\n` +
    `    filepath: \`${path}\`,\n` +
    `    ${propName}: import_${index},\n` +
    `  },`
  ));
};
