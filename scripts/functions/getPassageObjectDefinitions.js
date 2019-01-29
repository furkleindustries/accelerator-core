module.exports = function getPassageObjectDefinitions(files) {
  return files.map((path, index) => (
    `  {\n    filepath: \`${path}\`,\n    passageObject: import_${index},\n  },`
  ));
};
