import {
  pascalCaseToKebabCase,
} from '../../functions/pascalCaseToKebabCase';
import {
  ComponentType,
} from 'react';

/* Example: CoolComponent becomes cool-component. */
export const getReactMarkdownComponentKeyValuePair = (
  key: string,
  component: ComponentType<any>,
) => { 
  const formattedKey = pascalCaseToKebabCase(key);
  return { [formattedKey]: component };
};
