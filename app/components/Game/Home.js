import React, { Component, PropTypes } from 'react';

import io from 'socket.io-client';
import VelocityComponent from 'velocity-react/velocity-component';


export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      blink: true,
    }
    this._listenToButton = this._listenToButton.bind(this);
  }

  componentDidMount() {
    let socket = io();
    socket.emit("led-strobe-all");

    this._listenToButton();

    this.timer = setInterval(() => {
      this.setState({blink: !this.state.blink})
    }, 750);
  }

  componentWillUnmount() {
    let socket = io();
    socket.removeListener('rec');
    clearInterval(this.timer);
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
        <h1 style={{fontSize: 64, textTransform: "uppercase"}}>Jeoparty!</h1>
        <h2>It's party time!</h2>
        <VelocityComponent animation={{opacity: this.state.blink ? 1 : 0}} duration={120}>
          <h3 style={{color: "gold", textTransform: "uppercase"}}>Press Any Button!</h3>
        </VelocityComponent>
      </div>
    );
  }
}

Home.propTypes ={
  onToggleSelectionView: PropTypes.func.isRequired,
}
