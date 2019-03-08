export interface IStoryOptionComponentOwnProps<T extends any = any> {
  readonly optionPropName: string | null;
  getOptionValue?(): T;
}
