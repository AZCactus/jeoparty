import React, {Component} from 'react';
import io from 'socket.io-client';
import _ from 'lodash';

export default class PlayerSelection extends Component {

  constructor() {
    super();

    this.state = {
      player1: false,
      player2: false,
      player3: false,
    }

    this._listenToButtons = this._listenToButtons.bind(this);
    this._togglePlayer = this._togglePlayer.bind(this);
  }

  componentDidMount() {
    const socket = io();
    socket.emit("led-stop");
    this._listenToButtons();
  }

  _listenToButtons() {
    const socket = io();
    const callback = (obj) => {
      this._togglePlayer(obj);
    };

    socket.on('rec', function (data) {
      callback(data);
    });
  }

  _togglePlayer(obj) {
    const socket = io();
    let state = {}

    if (this.state[`player${obj.player}`]) {
      console.log("removing", obj)
      socket.emit(`led-off-${obj.player}`);
      state[`player${obj.player}`] = false;
    } else {
      console.log("adding", obj)
      socket.emit(`led-on-${obj.player}`);
      state[`player${obj.player}`] = true;
    }

    this.setState(state);
  }

  render() {
    const {
      player1,
      player2,
      player3,
    } = this.state;

    return (
      <div>
        <h2>Player Selection</h2>
        <p>Press Button To Play Game</p>
        <ul>
          <li>Player One {player1 ? "Active" : ""}</li>
          <li>Player Two {player2 ? "Active" : ""}</li>
          <li>Player Three {player3 ? "Active" : ""}</li>
        </ul>
      </div>
    );
  }
}
