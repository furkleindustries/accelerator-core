import {
  IAcceleratorConfigNormalized,
} from './configuration/IAcceleratorConfigNormalized';
import {
  IAcceleratorLoggersConfiguration,
} from './configuration/IAcceleratorLoggersConfiguration';
import {
  NewContentAlert,
} from './components/NewContentAlert';
import {
  newContentAlertId,
} from './components/NewContentAlert/newContentAlertId';
import {
  render,
} from 'react-dom';
import {
  runningOnLocalhost,
} from './runningOnLocalhost';

import * as React from 'react';

// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the 'N+1' visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

export const registerServiceWorker = ({
  loggers,
  publicUrl,
}: IAcceleratorConfigNormalized) => {
  const { log } = loggers;

  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === 'production' &&
      'serviceWorker' in navigator &&
      // Can't be run from null origins.
      !location.origin.startsWith('file://') &&
      !location.origin.startsWith('http://'))
  {
    // The URL constructor is available in all browsers that support SW.
    const publicUrlObj = new URL(
      publicUrl || '.',
      location.toString(),
    );

    if (publicUrlObj.origin !== location.origin) {
      // accelerator-core uses no routing. We may need to see if the constant
      // publicUrl value affects this but I suspect it will never fail.
      return;
    }

    addEventListener('load', () => {
      const swUrl = `${publicUrl.endsWith('/') ?
        publicUrl :
        `${publicUrl}/`}service-worker.js`;

      if (runningOnLocalhost()) {
        // This is running on localhost.
        // Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, loggers);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          log(
            'This web app is being served cache-first by a service worker.',
          );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl, loggers);
      }
    });
  }
};

export const registerValidSW = (
  swUrl: string,
  {
    log,
    warn,
  }: IAcceleratorLoggersConfiguration,
) => {
  try {
    navigator.serviceWorker
      .register(swUrl)
      .then(
        (registration) => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // At this point, the old content will have been purged and
                    // the fresh content will have been added to the cache.
                    const containerElem = document.body.querySelector(
                      newContentAlertId
                    );

                    if (containerElem) {
                      render(
                        React.createElement(NewContentAlert),
                        containerElem,
                      );
                    } else {
                      log('New content is available; please refresh.');
                    }
                  } else {
                    log('Content is cached for offline use.');
                  }
                }
              };
            }
          };
        },

        (err) => {
          warn('Error during service worker registration:');
          warn(err);
        },
      );
  } catch (err) {
    warn('Error during service worker registration:');
    warn(err);
  }
};

export const checkValidServiceWorker = (
  swUrl: string,
  loggers: IAcceleratorLoggersConfiguration,
) => {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl).then(
    (response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (response.status === 404 ||
        response.headers.get('content-type')!.indexOf('javascript') === -1)
      {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(({ unregister }) => {
          unregister().then(location.reload);
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, loggers);
      }
    },

    () => {
      loggers.log(
        'No internet connection found. App is running in offline mode.'
      );
    },
  );
}

export const unregister = async () => {
  if (navigator && 'serviceWorker' in navigator) {
    const {
      serviceWorker: { ready },
    } = navigator;

    return await (await ready).unregister();
  }

  throw new Error('Service workers are not supposed on this browser.');
};
