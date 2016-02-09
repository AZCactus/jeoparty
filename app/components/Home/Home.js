import React, { Component, PropTypes } from 'react';
import Question from '../Question/Question';
import io from 'socket.io-client';

export default class Home extends Component {

  constructor() {
    super();
    this._listenToButton = this._listenToButton.bind(this);
  }

  componentDidMount() {
    let socket = io();
    socket.emit("led-strobe-all");

    this._listenToButton();
  }

  _listenToButton() {
    let socket = io();
    const buttonTap = () => {this.props.onButtonTap()};
    socket.on('rec', function (data) {
      buttonTap();
    });
  }

  render() {

    return (
      <div>
        <h1>Jeoparty!</h1>
        <h2>It's party time!</h2>
        <h3>Press Any Button To Play!</h3>
      </div>
    );
  }
}

Home.propTypes ={
  onButtonTap: PropTypes.func.isRequired,
}
