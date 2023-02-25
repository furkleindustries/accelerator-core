import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  getImageCdnUrl,
} from '../../../passages/_images/getImageCdnUrl';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const StartScreenLogo: React.FC = () => (
  <AppContextConsumerWrapper>
    {({ config }) => (
      <div
        className={classNames(
          builtIns['title-logo-container'],
          'title-logo-container',
        )}

        role="presentation"
        aria-hidden="true"
      > 
        <img
          className={classNames(
            builtIns['title-logo-image'],
            'title-logo-image',
          )}

          alt="The Accelerate title logo image, with Mother and the Archon."
          src={`${getImageCdnUrl(config)}logo-three.webp`}
          role="presentation"
          aria-hidden="true"
        />

        <div
          className={classNames(
            builtIns['title-logo-mask'],
            'title-logo-mask',
          )}

          role="presentation"
          aria-hidden="true"
        ></div>
      </div>
    )}
  </AppContextConsumerWrapper>
);
