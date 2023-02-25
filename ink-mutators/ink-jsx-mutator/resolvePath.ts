const pathToArrayPath = (path: string): string[] => {
  if (path == null || path === '') return []
  return path.split('.')
};

const resolveArrayPath = (object: any, pathArr: string[]): string[] | null => {
  const [
    property,
    ...subPath
  ] = pathArr;

  if (object == null || property == null) {
    return null;
  }

  return subPath.length === 0 ?
    object[property] :
    resolveArrayPath(object[property], subPath)
};

export const resolvePath = (object: any, path: string) => (
  resolveArrayPath(object, pathToArrayPath(path))
);
