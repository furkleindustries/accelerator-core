import type {
  MouseEvent as ReactMouseEvent,
} from 'react';

export interface IClickable<T extends HTMLElement = HTMLElement> {
  readonly onClick?: (e: ReactMouseEvent<T, MouseEvent>) => void;
}
