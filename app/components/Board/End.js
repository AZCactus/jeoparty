import React, { Component, PropTypes } from 'react';

import io from 'socket.io-client';


export default class End extends Component {

  constructor() {
    super();
    this.state = {
      blink: true,
    }
  }

  componentDidMount() {
    const socket = io();
    socket.emit(`led-strobe-${this.props.winner}`);

    this.timer = setInterval(() => {
      this.setState({blink: !this.state.blink})
    }, 100);

    setTimeout(() => {
      this.props.flush();
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {

    return (
      <div className="view flex flex-column flex-middle flex-center">
        <h1 style={{textTransform: 'uppercase', opacity: this.state.blink ? 1 : 0}}>Player {this.props.id} Wins!</h1>
        <h2>${this.props.score}</h2>
      </div>
    );
  }
}
