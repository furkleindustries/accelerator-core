import {
  assertValid,
} from 'ts-assertions';

export const getHelperVariant = ({
  family,
  style,
  variants,
  weight,
}) => (
  assertValid(
    variants.find(({
      fontStyle,
      fontWeight,
    }) => {
      if (style !== fontStyle) {
        return false;
      }

      return fontWeight === String(weight);
    }),

    `A matching web font could not be found for the font family "${family}" ` +
      `with the style "${style}" and weight "${weight}".`,
  )
);
