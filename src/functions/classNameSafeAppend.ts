export function classNameSafeAppend(
  className: string | undefined,
  toAppend: string,
): string {
  return className ? `${className} ${toAppend}` : toAppend;
}