import {
  unmountComponentAtNode,
} from 'react-dom';
import {
  assertValid,
} from 'ts-assertions';

export const clearLoadingScreen = (
  appSelector: string,
  loadSelector: string,
) => {
  const root = assertValid<Element>(document.body.querySelector(appSelector));
  root.setAttribute('aria-busy', 'false');

  const load = assertValid<Element>(document.body.querySelector(loadSelector));
  unmountComponentAtNode(load);
};
