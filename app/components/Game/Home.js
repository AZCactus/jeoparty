import React, { Component, PropTypes } from 'react';

import GameActions from '../../actions/GameActions';

import logo from '../../images/jeoparty.jpg';

import VelocityComponent from 'velocity-react/velocity-component';


export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      blink: true,
    }
  }

  componentDidMount() {
    const {
      buzzListen,
      ledOff,
      ledStrobe,
    } = GameActions;

    ledOff.defer();
    ledStrobe.defer();
    buzzListen.defer(this.onBuzz);

    // this.timer = setInterval(() => {
    //   this.setState({blink: !this.state.blink})
    // }, 750);
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
  }

  onBuzz() {
    GameActions.changeView('select');
  }


  render() {

    return (
      <div className="view" style={{backgroundImage: `url(${logo})`, backgroundSize: 'cover'}}>
        <h3
          className="white"
          style={{
            textTransform: "uppercase",
            opacity: this.state.blink ? 0 : 1,
            position: 'fixed',
            letterSpacing: 12,
            top: 50,
            fontSize: 32,
            width: '100%',
            textAlign: 'center'}}>
          It's Party Time!
        </h3>
        <h3
          className="yellow"
          style={{
            textTransform: "uppercase",
            opacity: this.state.blink ? 1 : 0,
            position: 'fixed',
            letterSpacing: 12,
            bottom: 50,
            fontSize: 32,
            width: '100%',
            textAlign: 'center'}}>
          Press Any Button
        </h3>
      </div>
    );
  }
}
