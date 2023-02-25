export interface IAppState {
  readonly error: Error | string | null;
  readonly seenError: boolean;
}
