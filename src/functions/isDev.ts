export function isDev() {
  return Boolean(
    process &&
    process.env &&
    process.env.NODE_ENV === 'development' &&
    String(process.env.ACCELERATOR_DEBUG) === 'true'
  );
}
