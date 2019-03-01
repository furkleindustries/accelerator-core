import classnames from 'classnames';
import {
  getSoundManagerContext,
} from '../../context/getSoundManagerContext';
import {
  ISoundManagerAudioPanelOwnProps,
} from './ISoundManagerAudioPanelOwnProps';
import {
  IManager,
} from 'sound-manager';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

const ctx = getSoundManagerContext();

export class SoundManagerAudioPanel extends React.PureComponent<ISoundManagerAudioPanelOwnProps> {
  public static contextType = ctx;

  private ref: React.RefObject<HTMLDivElement>;

  public render = () => {
    const {
      className,
      ref,
    } = this.props;

    if (ref) {
      this.ref = ref;
    } else {
      this.ref = React.createRef();
    }

    return (
      <SoundManagerAudioPanelRefForwarded
        className={className}
        ref={this.ref}
      />
    );
  }

  public componentDidMount = () => {
    /* All of this must be done through refs as sound-manager does not export
     * React components at present. */
    const { soundManager }: { soundManager: IManager } = this.context;

    const safeContainer = assertValid<HTMLDivElement>(
      this.ref.current,
    );

    const soundPanel = soundManager.generateVolumePanelElement();
    safeContainer.appendChild(soundPanel);
  }
}

export const SoundManagerAudioPanelRefForwarded = React.forwardRef((
  { className }: { className?: string },
  ref: React.RefObject<HTMLDivElement>,
) => (
  <div
    className={classnames('soundManagerAudioPanel', className)}
    ref={ref}
  >
  </div>
));
