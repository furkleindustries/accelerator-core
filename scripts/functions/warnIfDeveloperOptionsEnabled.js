import chalk from 'chalk';
import {
  configurationDefaults,
} from "../../src/configuration/configurationDefaults";

export const warnIfDeveloperOptionsEnabled = ({
  autoplayer: {
    active,
    scroll,
  },

  debug,
  debugOptions: {
    startPassageAfterMenu,
    noTimings,
    startInkPathString,
    startInkState,
    storyState,
    stubLastPassageName,
  },
} = configurationDefaults) => {
  if (active || scroll || debug || startInkPathString || stubLastPassageName) {
    console.warn(chalk.yellow(
      `One or more developer options ` +
        `generally used for testing and demonstration was left on. ` +
        `If this was deliberate, set ${chalk.underline('warnIfDeveloperOptionsEnabled')} to false ` +
        `in ${chalk.underline('accelerator.config.js')}.\n`,
    ));

    if (active) {
      console.warn(chalk.yellow(
        `- The ${chalk.underline('Autoplayer')} is active.`,
      ));
    }

    if (scroll) {
      console.warn(chalk.yellow(
        `- The ${chalk.underline('Autoplayer')} will scroll automatically.`,
      ));
    }

    if (debug) {
      console.warn(chalk.yellow(
        `- The ${chalk.underline('debug')} variable was true. ` +
          `The build will be made in ${chalk.underline('production')} mode, ` +
          `but the debug functionality will still be built in. ` +
          `This may have size and performance impacts on your story, ` +
          `or could cause bugs through players navigating to arbitrary passages at will.`,
      ));

      if (noTimings) {
        console.warn(chalk.yellow(
          `- The ${chalk.underline('noTimings')} debug option was true. ` +
            `Some animations may appear glitchy or not appear.`,
        ));
      }

      if (startInkState) {
        console.warn(chalk.yellow(
          `- The ${chalk.underline('startInkState')} debug option was set. ` +
            `These variables will be injected into the Ink engine ` +
            `when the first Ink passage is reached.`,
        ));
      }

      if (startPassageAfterMenu) {
        console.warn(chalk.yellow(
          `- The ${chalk.underline('startPassageAfterMenu')} debug option was set. ` +
            `The story may redirect to a different passage than expected after the menu.`,
        ));
      }

      if (storyState && Object.keys(storyState).length) {
        console.warn(chalk.yellow(
          `- The ${chalk.underline('storyState')} debug option was set. ` +
            `These variables will be injected into the Accelerator story ` +
            `state at story start.`,
        ));
      }

      if (stubLastPassageName) {
        console.warn(chalk.yellow(
          `- The ${chalk.underline('stubLastPassageName')} debug option was set. ` +
            `The story may behave differently than expected in passages which rely ` +
            `on the previous passage name for rendering and logic.`, 
        ));
      }
    }

    // Insert a newline. Passing another newline as the argument will result in
    // two newlines.
    console.log();

    return true;
  }

  return false;
};