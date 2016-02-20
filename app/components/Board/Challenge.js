import React, { Component, PropTypes } from 'react';
import Answering from './Answering';
import GameActions from '../../actions/GameActions';

import _ from 'lodash';

export default class Challenge extends Component {

  constructor() {
    super();

    this.state = {
      spoil: false,
    };
  }


  componentDidMount() {
    this.startTheCount(10);
    GameActions.buzzListen(this.handleClick.bind(this));
  }

  componentWillUnmount() {
    GameActions.buzzListen.defer(null);
  }

  startTheCount(seconds) {
    const config = {
      seconds: seconds,
      callback: this.timerCallback.bind(this),
    };
    GameActions.ledOff();
    GameActions.ledActivePlayers();
    GameActions.setTimer(config);
  }

  timerCallback() {
    this.setState({spoil: true});
    setTimeout(this.props.end, 2000);
  }

  handleClick(data) {
    const {
      buzzed,
      players,
    } = this.props;
    const player = data.player;

    if (!buzzed && _.filter(players, {id: player, wrong: false}).length > 0) {
      GameActions.clearTimer();
      this.props.buzz(player);
    }
  }

  onReset() {
    const {
      buzz,
      players,
      end
    } = this.props;

    if (_.filter(players, {wrong: false}).length > 0) {

      setTimeout(() => {
        buzz(null);
        this.startTheCount(4);
      }, 2000);

    } else {
      this.timerCallback();
    }
  }


  render() {
    const {
      answer,
      buzzed,
      clue,
      seconds,
      success,
    } = this.props;

    return (
      <div className='view flex flex-justify flex-middle flex-column' style={{height: '75%'}}>
        <span className='center'>{seconds}</span>
        <h1 className='center' style={{width: '75%', margin: '0 auto'}}>{clue}</h1>
        {this.state.spoil ? <h2 className='center bg-white purple' style={{width: '75%', margin: '20px auto 0', padding: 20}}>{answer}</h2> : null}
        {buzzed ? <Answering {...this.props} reset={this.onReset.bind(this)} success={success.bind(this)} /> : null}
      </div>
    );
  }
}

Challenge.propTypes = {
  answer: PropTypes.string.isRequired,
  buzz: PropTypes.func.isRequired,
  end: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
};
