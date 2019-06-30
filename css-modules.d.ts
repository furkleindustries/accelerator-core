declare const classes: Record<string, string>;

declare module '*.css' {
  export default classes;
}

declare module '*.less' {
  export default classes;
}
