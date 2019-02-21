import {
  unmountComponentAtNode,
} from 'react-dom';
import { assertValid } from 'ts-assertions';

export function clearLoadingScreen(appSelector: string, loadSelector: string) {
  const root = assertValid<Element>(document.querySelector(appSelector));
  root.setAttribute('aria-busy', 'false');

  const load = assertValid<Element>(document.querySelector(loadSelector));
  unmountComponentAtNode(load);
}

