export interface IOptionComponent<T extends any = any> {
  readonly optionPropName: string | null;
  getOptionValue?(): T;
}
