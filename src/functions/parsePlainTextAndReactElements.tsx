import * as componentsBundle from '../../bundles/componentsBundle';
import {
  ParseReactElementsAndTextProps,
} from '../typeAliases/ParseReactElementsAndTextProps';
// @ts-ignore
import JsxParser from 'react-jsx-parser';
import {
  ComponentType,
} from 'react';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const parsePlainTextAndReactElements = (text: string, {
  bindings,
  components,
  mergeComponents,
}: ParseReactElementsAndTextProps) => {
  const elems: HTMLElement[] = [];
  let underscoresInRow = 0;
  let inReactMode = false;
  let blockStartIndex = 0;
  for (let ii = 0; ii < text.length; ii += 1) {
    const char = text[ii];
    if (char === '_') {
      underscoresInRow += 1;
      if (underscoresInRow === 3) {
        const block = text.slice(blockStartIndex, ii);
        if (inReactMode) {
          let comps: Record<string, ComponentType<any>> = (
            { ...(components || componentsBundle) }
          ) as Record<string, ComponentType<any>>;

          if (components) {
            if (mergeComponents === false) {
              comps = { ...componentsBundle };
            } else {
              comps = {
                ...componentsBundle,
                ...components,
              };
            }
          }

          const container = document.createElement('div');
          const Component = (
            <JsxParser
              bindings={bindings}
              components={comps}
              jsx={block}
            />
          );

          ReactDOM.render(Component, container);
          elems.push(container);
        } else {
          const span = document.createElement('span');
          span.innerHTML = block;
          elems.push(span);
        }

        inReactMode = !inReactMode;
        underscoresInRow = 0;
        blockStartIndex = ii + 1;
      }
    }
  }

  return elems;
};
