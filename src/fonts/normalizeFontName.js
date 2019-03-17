export function normalizeFontName(fontName) {
  let name = fontName.replace(/\s/g, '-');
  name = `${name[0].toUpperCase()}${name.slice(1)}`;

  return name;
}
