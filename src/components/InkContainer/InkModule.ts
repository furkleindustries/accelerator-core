export interface InkModule {
  readonly storyContent: Record<string, any> & { root: Record<string, any> };
  readonly text: string;
}
