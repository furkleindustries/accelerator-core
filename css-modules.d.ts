declare const classes: { [key: string]: string };

declare module '*.css' {
  export default classes;
}

declare module '*.less' {
  export default classes;
}
