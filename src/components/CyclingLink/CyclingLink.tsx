import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  IAction,
} from '../../actions/IAction';
import {
  ICyclingLinkDispatchProps,
} from './ICyclingLinkDispatchProps';
import {
  ICyclingLinkOwnProps,
} from './ICyclingLinkOwnProps';
import {
  ICyclingLinkState,
} from './ICyclingLinkState';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';

// @ts-ignore
import _styles from './CyclingLink.scss';
const styles = _styles || {};

import * as React from 'react';

export class CyclingLink extends React.Component<ICyclingLinkOwnProps & ICyclingLinkDispatchProps, ICyclingLinkState> {
  public state = {
    index: 0,
  }

  constructor(props: any, context?: any) {
    super(props, context);

    this.advance = this.advance.bind(this);
  }

  public componentDidMount() {
    const {
      choices,
      variableToSet,
      setStoryState,
    } = this.props;

    const {
      index,
    } = this.state;

    /* Don't forget to set it the first time, before interaction. */
    if (variableToSet) {
      setStoryState({
        [variableToSet]: choices[index],
      });
    }
  }
  
  public render() {
    const {
      choices,
      className,
    } = this.props;

    const {
      index,
    } = this.state;

    return (
      <button 
        className={`${styles.cyclingLink} cyclingLink${className ? ` ${className}` : ''}`}
        onClick={this.advance}
      >
        {choices[index]}
      </button>
    );
  }

  private advance() {
    const {
      choices,
      setStoryState,
      variableToSet,
    } = this.props;

    const {
      index,
    } = this.state;
    
    const newIndex = index + 1 >= choices.length ? 0 : index + 1
    this.setState({
      index: newIndex,
    });

    if (variableToSet && typeof variableToSet === 'string') {
      setStoryState({
        [variableToSet]: choices[newIndex],
      });
    }
  }
}

export const mapDispatchToProps: MapDispatchToProps<ICyclingLinkDispatchProps, ICyclingLinkOwnProps> = (dispatch: Dispatch<IAction>) => ({
  setStoryState(newState) {
    return dispatch(createStoryStateAction(newState));
  }
});

export const CyclingLinkConnected = connect(null, mapDispatchToProps)(CyclingLink);

export default CyclingLinkConnected;
