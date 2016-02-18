import React, { Component, PropTypes } from 'react';

import GameActions from '../../actions/GameActions';

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
