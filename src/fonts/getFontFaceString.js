export const getFontFaceString = ({
  family,
  localName,
  range,
  srcUrls,
  style,
  unicodeRange,
  weight,
}) => (
  `/* ${range} */\n` +
  `@font-face {\n` +
  `  font-family: ${family};\n` +
  `  font-style: ${style};\n` +
  `  font-weight: ${weight};\n` +
  `  font-display: swap;\n` +
  `  src: local('${localName}'), ${srcUrls};\n` +
  `  unicode-range: ${unicodeRange};\n` +
  `}`
);
