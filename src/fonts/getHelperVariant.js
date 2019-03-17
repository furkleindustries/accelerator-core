import {
  assertValid,
} from 'ts-assertions';

export function getHelperVariant({
  family,
  style,
  variants,
  weight,
}) {
  return assertValid(
    variants.find(({
      fontStyle,
      fontWeight,
    }) => style === fontStyle && String(weight) === fontWeight),
    `A matching web font could not be found for the font family "${family}" ` +
      `with the style "${style}" and weight "${weight}".`,
  );
}
