import {
  MouseEvent as ReactMouseEvent,
} from 'react';

export interface IClickable<T extends HTMLElement = HTMLElement> {
  onClick?(e: ReactMouseEvent<T, MouseEvent>): void;
}
