import type {
  Story,
} from 'inkjs/engine/Story';

export const getRawInkValue = (story: Story, key: string): string | number | null => {
  const val = (story.variablesState.GetRawVariableWithName(key, -1) as any || {}).value;
  if (!val && val !== 0) {
    return null;
  }

  return val;
};
