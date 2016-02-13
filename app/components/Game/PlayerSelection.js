import React, {Component} from 'react';
import io from 'socket.io-client';

export default class PlayerSelection extends Component {

  constructor() {
    super();

    this._listenToButtons = this._listenToButtons.bind(this);
  }

  componentDidMount() {
    const socket = io();
    socket.emit("led-stop");
    this._listenToButtons();
  }

  componentWillUnmount() {
    const socket = io();
    socket.removeListener('rec');
  }

  _listenToButtons() {
    const socket = io();
    const callback = (obj) => {
      this.props.onTogglePlayer(obj.player)
    };

    socket.on('rec', function (data) {
      callback(data);
    });
  }


  render() {

    const {
      players,
    } = this.props;

    return (
      <div className="view flex flex-column flex-start flex-center">
        <header className="full-x" style={{textAlign: "center"}}>
          <h2>Player Selection</h2>
          <p>Press Button To Play Game</p>
        </header>
        <div className="flex flex-justify full-x">
          <p>Player One {players["1"] ? "Active" : ""}</p>
          <p>Player Two {players["2"] ? "Active" : ""}</p>
          <p>Player Three {players["3"] ? "Active" : ""}</p>
        </div>
      </div>
    );
  }
}
