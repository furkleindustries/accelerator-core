import {
  getHelperVariant,
} from './getHelperVariant';
import {
  getUnicodeRange,
} from './getUnicodeRange';

export function getFontFaceRules(
  {
    styles,
    ranges,
    weights,
  },
  {
    defVariant,
    family,
    fontWeight,
    variants,
  },
) {
  const flatRanges = Array.isArray(ranges) ? ranges : [ ranges ];
  return flatRanges.reduce((arr, range) => {
    const flatStyles = Array.isArray(styles) ? styles : [ styles ];
    return arr.concat(flatStyles.reduce((arr, style) => (
      arr.concat(weights.reduce((arr, weight) => {
        const { local } = getHelperVariant({
          style,
          variants,
          weight,
        });

        arr.push(
          `@font-face {\n` +
          `  font-family: ${family};\n` +
          `  font-style: ${defVariant};\n` +
          `  font-weight: ${fontWeight};\n` +
          `  src: local('${local[0]}'), local('${local[1]}'), ;` +
          `  unicode-range: ${getUnicodeRange(range)};` +
          `}`
        );

        return arr;
      }, []))
    ), []))
  }, []).join();
}
