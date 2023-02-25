export const camelCase = (str: string) => (
  str
    .replace(/([A-Z])([A-Z])/g, '$1 $2')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z\u00C0-\u00ff]/g, ' ')
    .toLowerCase()
    .split(' ')
    .filter((value) => value)
    .map((char, index) => (index > 0 ? char[0].toUpperCase() + char.slice(1) : char))
    .join('')
);
