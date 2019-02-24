import { IBeginLoadOptions } from '../src/passages/IBeginLoadOptions';
import { InitializationHandler } from '../src/passages/InitializationHandler';

//import logo from '../public/logo.svg';

/* This file is used for any logic which must execute before the story begins
 * every time it is loaded. This includes loading story saves. Do not use this
 * passage for logic which should only be executed on the start passage. */
export default async function initialization<T extends InitializationHandler>({
  /* Must be called at some point, otherwise the story will never be
   * visible. */
  beginLoad,
  /* Called automatically if the number of ticks is equal or greater to
   * progressMax, or if progressMax is 0. */
  completeLoad,
  updateProgressTicks,
}: T) {
  /* Call any of the function arguments besides beginLoad here. Any calls to
   * other functions will be disregarded after beginLoad is called. */
  
  const opts: IBeginLoadOptions = {
    /*bodyText: 'This is a sample loading screen.',
    // component: MyLoadingScreen,
    descriptions: [
      'Gathering Particle Sources',
      'Integrating Curves',
      'Bureacritizing Bureaucracies',
      'Attempting to Lock Back-Buffer',
      'Gesticulating Mimes',
      'Perturbing Matrices',
      'Fixing Election Outcome Matrix',
      'Normalizing Power',
      'Initializing Rhinoceros Breeding Timetable',
      'Calculating Llama Expectoration Trajectory',
      'Lecturing Errant Subsystems',
    ],
    // doneCallback: () => doThing();
    logoPath: logo,
    // progressMax: 15,
    // progressStart: 2,
    // title: 'Custom title',*/
  };

  /* beginLoad *must* be called, otherwise the story will never load. Do not
   * delete this call, but feel free to pass any of the optional arguments to
   * it. */
  beginLoad(opts);

  /* Call loading and initialization actions here, update the progress ticks
   * (if maxProgress is not -1), etc. */
  /*let counter = 0;
  const interval = setInterval(() => {
    updateProgressTicks(counter);
    counter += 1;
    if (counter > opts.descriptions!.length) {
      clearInterval(interval);
    }
  }, 1000);*/
}
