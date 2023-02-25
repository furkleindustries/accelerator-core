export const valueIsStringifiable = (value: any): value is string => (
  value !== undefined &&
    value !== null &&
    'toString' in value &&
    typeof value.toString === 'function'
);
