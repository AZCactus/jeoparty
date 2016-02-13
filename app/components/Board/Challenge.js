import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';

export default class Challenge extends Component {

  constructor() {
    super();

    this.state = {
      elapsed: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const handleClick = this.handleClick;

    if (!this.props.buzzed) {
      this.timer = setInterval(this.tick.bind(this), 50);
      const socket = io();
      socket.emit(`led-stop`);

      socket.on('rec', function (data) {
        console.log(data);
        handleClick(data.player);
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    const socket = io();
    socket.removeListener('rec');
  }

  shouldComponentUpdate(nextProps, nextState) {
    let elapsed = Math.round(nextState.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(0);

    if (nextProps.buzzed) {
      clearInterval(this.timer);
    } else if (this.props.buzzed && !nextProps.buzzed) {
      this.timer = setInterval(this.tick.bind(this), 50);
    }

    if (seconds > 7) {
      this.props.onReset();
      return false;
    } else {
      return true;
    }
  }

  tick() {
    this.setState({elapsed: new Date() - this.props.start});
  }

  handleClick(player) {
    this.props.onBuzz(player);
  }

  render() {
    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(0);

    let buzzed = { player: 1 };

    return (
      <div className="view flex flex-justify flex-middle flex-center flex-column">
        <span>{8 - seconds}</span>
        <h1 style={{width: "75%"}}>{this.props.clue}</h1>
      </div>
    );
  }
}

Challenge.propTypes = {
  answer: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
};
