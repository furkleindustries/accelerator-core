export function normalizeFontName (string) {
  return string.replace(/\s/g, '-').toLowerCase();
}
