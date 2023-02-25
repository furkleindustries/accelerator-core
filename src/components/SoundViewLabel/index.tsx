import {
  Anchor,
} from '../Anchor';
import classNames from 'classnames';
import {
  ISoundViewLabelOwnProps,
} from './ISoundViewLabelOwnProps';
import {
  ISoundViewLabelStateProps,
} from './ISoundViewLabelStateProps';
import {
  IState,
} from '../../state/IState';
import {
  List,
} from '../List';
import {
  ListItem,
} from '../ListItem';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import styles from '../../../options/sound-manager/sound-manager.less';

export const SoundViewLabelUnconnected: React.FC<
  ISoundViewLabelOwnProps &
    ISoundViewLabelStateProps
> = React.memo(({
  className,
  soundState: {
    label: {
      artistName,
      contributors,
      license,
      link,
    },
  },
}) => (
  <div
    className={classNames(
      styles['sound-view-label'],
      'sound-view-label',
      className,
    )}

    role="group"
  >
    {artistName ?
      <>
        <Typography
          className={classNames(
            styles['sound-view-label-artist-header'],
            'sound-view-label-artist-header',
          )}

          variant="h5"
          aria-roledescription="Artist/Band name"
        >
          Artisan
        </Typography>

        <Typography
          className={classNames(
            styles['sound-view-label-artist-name'],
            'sound-view-label-artist-name',
          )}

          paragraph={true}
          role="group"
        >
          <Typography
            className={classNames(
              styles['sound-view-label-artist-name-text'],
              'sound-view-label-artist-name-text',
            )}

            component="strong"
            role="contentinfo"
          >
            {artistName}
          </Typography>
        </Typography>
      </> :
      null}

    {Array.isArray(contributors) && contributors.length ?
      <>
        <Typography
          className={classNames(
            styles['sound-view-label-contributors-heading'],
            'sound-view-label-contributors-heading',
          )}

          variant="h6"
        >
          Contributors
        </Typography>

        <List
          className={classNames(
            styles['sound-view-label-contributors-list'],
            'sound-view-label-contributors-list',
          )}
        >
          {contributors.map((item, key) => (
            <ListItem
              className={classNames(
                styles['sound-view-label-contributors-list-item'],
                'sound-view-label-contributors-list-item',
              )}

              key={`${item}-${key}`}
            >
              <Typography
                className={classNames(
                  styles['sound-view-label-contributor-text'],
                  'sound-view-label-contributor-text',
                )}

                component="em"
                role="contentinfo"
              >
                {item}
              </Typography>
            </ListItem>
          ))}
        </List>
      </> :
      null}

    {link ?
      <>
        <Typography
          className={classNames(
            styles['sound-view-label-link-heading'],
            'sound-view-label-link-heading',
          )}

          variant="h6"
          aria-roledescription="Off-site link to purchase music"
        >
          Link
        </Typography>

        <Typography
          className={classNames(
            styles['sound-view-label-link'],
            'sound-view-label-link',
          )}

          paragraph={true}
          role="group"
        >
          <Anchor
            href={link}
            target="_blank"
          >
            Get the song here
          </Anchor>
        </Typography>
      </> :
      null}

    {license ?
      <>
        <Typography
          className={classNames(
            styles['sound-view-label-license-heading'],
            'sound-view-label-license-heading',
          )}

          variant="h6"
        >
          License
        </Typography>

        <Typography
          className={classNames(
            styles['sound-view-label-license'],
            'sound-view-label-license',
          )}

          paragraph={true}
          role="contentinfo"
        >
          {license}
        </Typography>
      </> :
      null}
  </div>
));

SoundViewLabelUnconnected.displayName = 'SoundViewLabelUnconnected';

export const mapStateToProps: MapStateToProps<
  ISoundViewLabelStateProps,
  ISoundViewLabelOwnProps,
  IState
> = (
  {
    soundManagerState: { sounds },
  },

  { soundName },
) => ({ soundState: sounds[soundName] });

export const SoundViewLabel = connect(
  mapStateToProps,
)(SoundViewLabelUnconnected);
