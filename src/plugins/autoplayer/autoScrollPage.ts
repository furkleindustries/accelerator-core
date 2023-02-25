import chalk from 'chalk';
import {
  IAutoScrollArgs,
} from './IAutoScrollArgs';

export const autoScrollPage = ({
  duration,
  debug,
  loggers: { log },
  textPane,
}: IAutoScrollArgs) => {
  const textPanePosition = textPane.scrollTop;
  const destination = textPane.scrollHeight - textPane.clientHeight;

  const delta = Math.ceil(destination - textPanePosition);

  (document.firstElementChild as any).style.setProperty(
    '--ink-choice-content-delay-duration',
    `${delta > 15 ? Math.floor(duration * 0.865) : 1650}ms`,
  );

  (document.firstElementChild as any).style.setProperty(
    '--ink-choice-content-fade-duration',
    `${Math.floor(duration / 6.5)}ms`,
  );

  if (delta <= 0) {
    return;
  }

  if (debug) {
    log('---- Autoplayer ----');

    log(
      `Scrolling ${chalk.underline(delta)}px.` // +
        //`over ${chalk.underline(duration)} ` +
        //`milliseconds.`,
    );

    log('--------');
  }

  textPane.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: destination,
  });
};
