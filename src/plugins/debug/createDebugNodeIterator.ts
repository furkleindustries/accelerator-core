import {
  DebugDataIterator,
} from './DebugDataIterator';
import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';

export const createDebugNodeIterator = <T extends SerializableDataTypes>(
  showNonenumerable: boolean = false,
  sortObjectKeys: boolean = false,
): DebugDataIterator<T> => {
  const objectIterator = function* (data: SerializableDataTypes) {
    if (!data || typeof data !== 'object') {
      return;
    }

    const dataIsArray = Array.isArray(data);

    // iterable objects (except arrays)
    if (!dataIsArray && data[Symbol.iterator]) {
      let ii = 0;
      for (const entry of data as Iterable<SerializableDataTypes>) {
        if (Array.isArray(entry) && entry.length === 2) {
          yield {
            data: entry[1],
            isNonenumerable: false,
            nodeName: entry[0],
          };
        } else {
          yield {
            data: entry,
            isNonenumerable: false,
            nodeName: ii.toString(),
          };
        }

        ii += 1;
      }
    } else {
      const keys = Object.getOwnPropertyNames(data);
      if (sortObjectKeys && !dataIsArray) {
        // Array keys should not be sorted in alphabetical order
        keys.sort();
      }

      for (const propertyName of keys) {
        if (Object.propertyIsEnumerable.call(data, propertyName)) {
          const propertyValue = data[propertyName];
          yield {
            data: propertyValue,
            isNonenumerable: false,
            nodeName: propertyName || `""`,
          };
        } else if (showNonenumerable) {
          // To work around the error (happens some time when propertyName === 'caller' || propertyName === 'arguments')
          // 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
          // http://stackoverflow.com/questions/31921189/caller-and-arguments-are-restricted-function-properties-and-cannot-be-access
          let propertyValue;
          try {
            propertyValue = data[propertyName];
          } catch (e) {
            // console.warn(e)
          }

          if (propertyValue !== undefined) {
            yield {
              data: propertyValue,
              isNonenumerable: true,
              nodeName: propertyName,
            };
          }
        }
      }

      // [[Prototype]] of the object: `Object.getPrototypeOf(data)`
      // the property name is shown as "__proto__"
      if (showNonenumerable && data !== Object.prototype) {
        yield {
          data: Object.getPrototypeOf(data),
          isNonenumerable: true,
          nodeName: '__proto__',
        };
      }
    }
  };

  return objectIterator as DebugDataIterator<T>;
};
