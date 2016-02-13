import React, { Component, PropTypes } from 'react';

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

  componentWillUnmount() {
    let socket = io();
    socket.removeListener('rec');
  }

  _listenToButton() {
    let socket = io();
    const buttonTap = () => {this.props.onToggleSelectionView(true)};
    socket.on('rec', function (data) {
      buttonTap();
    });
  }

  render() {

    return (
      <div className="flex flex-column flex-center flex-middle view">
        <h1>Jeoparty!</h1>
        <h2>It's party time!</h2>
        <h3>Press Any Button To Play!</h3>
        <div><button onClick={this.props.onToggleSelectionView}>Button</button></div>
      </div>
    );
  }
}

Home.propTypes ={
  onToggleSelectionView: PropTypes.func.isRequired,
}
