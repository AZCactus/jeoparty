import React, { Component, PropTypes } from 'react';
import GameActions from '../../actions/GameActions';

export default class Challenge extends Component {

  constructor() {
    super();
    
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const config = {
      seconds: 8,
      callback: this.props.reset,
    };

    GameActions.ledOff();
    GameActions.setTimer(config)
    GameActions.buzzListen(this.handleClick);
  }

  handleClick(player) {
    this.props.onBuzz(player);
  }

  _renderStatement(statement) {
    if (statement) {
      return (
        <h3>{statement}</h3>
      );
    }
  }

  render() {

    return (
      <div className="view flex flex-justify flex-middle flex-column">
        <span>{this.props.seconds}</span>
        <h1 className='center' style={{width: "75%"}}>{this.props.clue}</h1>
        {this._renderStatement(this.props.statement)}
      </div>
    );
  }
}

Challenge.propTypes = {
  answer: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
};
