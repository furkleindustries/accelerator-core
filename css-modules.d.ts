declare const classes: { [key: string]: string };

declare module '*.css' {
  export default classes;
}

declare module '*.sass' {
  export default classes;
}

declare module '*.scss' {
  export default classes;
}
