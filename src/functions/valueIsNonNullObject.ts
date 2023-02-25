export const valueIsNonNullObject = <T extends Record<any, any>>(
  value: any,
): value is T => (
  value !== null && typeof value === 'object'
);
