import {
  assertValid,
} from 'ts-assertions';

export function getHelperVariant({
  style,
  variants,
  weight,
}) {
  return assertValid(
    variants.find(({
      fontStyle,
      fontWeight,
    }) => style === fontStyle && String(weight) === fontWeight),
  );
}
