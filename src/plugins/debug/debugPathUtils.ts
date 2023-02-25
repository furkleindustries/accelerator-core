import {
  DebugDataIterator,
} from './DebugDataIterator';
import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';

export const defaultRootPath = '$';

export const wildcard = '*';

export const hasChildNodes = (
  data: SerializableDataTypes,
  dataIterator: DebugDataIterator<SerializableDataTypes>,
) => (
  !(dataIterator(data).next().done)
);

// i is depth
export const wildcardPathsFromLevel = (level: number) => (
  Array.from(
    { length: level },
    (_, ii) => (
      [ defaultRootPath ].concat(
        Array.from(
          { length: ii },
          () => '*',
        ),
      ).join('.')
    ),
  )
);

export interface IGetExpandedPathsArgs {
  readonly data: SerializableDataTypes;
  readonly dataIterator: DebugDataIterator<SerializableDataTypes>;
  readonly prevExpandedPaths: string[];
  readonly expandLevel?: number;
  readonly expandPaths?: string[];
}

export const getExpandedPaths = ({
  data,
  dataIterator,
  expandLevel,
  expandPaths,
  prevExpandedPaths,
}: IGetExpandedPathsArgs): string[] => {
  const wildcardPaths = ([] as string[])
    .concat(expandLevel ? wildcardPathsFromLevel(expandLevel) : [])
    .concat(expandPaths || [])
    .filter(Boolean);

  const expandedPaths: string[] = [];
  wildcardPaths.forEach(wildcardPath => {
    const keyPaths = wildcardPath.split('.');
    const populatePaths = (curData: any, curPath: string, depth: number) => {
      if (depth === keyPaths.length) {
        expandedPaths.push(curPath);
        return;
      }

      const key = keyPaths[depth];
      if (!depth) {
        if (hasChildNodes(curData, dataIterator) &&
          (key === defaultRootPath || key === wildcard))
        {
          populatePaths(curData, defaultRootPath, depth + 1);
        }
      } else {
        if (key === wildcard) {
          for (const { nodeName: name, data } of dataIterator(curData)) {
            if (hasChildNodes(data, dataIterator)) {
              populatePaths(data, `${curPath}.${name}`, depth + 1);
            }
          }
        } else {
          const value = curData[key];
          if (hasChildNodes(value, dataIterator)) {
            populatePaths(value, `${curPath}.${key}`, depth + 1);
          }
        }
      }
    };

    populatePaths(data, '', 0);
  });

  return expandedPaths.reduce(
    (obj, path) => ({
      ...obj,
      [path]: true,
    }),

    { ...prevExpandedPaths },
  );
};
