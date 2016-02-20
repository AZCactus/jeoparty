import React, { Component } from 'react';
import GameActions from '../../actions/GameActions';
import logo from '../../images/jeoparty.jpg';


export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      blink: true,
    };
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

    this.timer = setInterval(() => {
      this.setState({blink: !this.state.blink});
    }, 750);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onBuzz() {
    GameActions.changeView('select');
  }


  render() {

    return (
      <div className='view' style={{background: `url(${logo}) no-repeat center center fixed`, backgroundSize: 'cover'}}>
        <h3
          className='white center'
          style={{
            textTransform: 'uppercase',
            opacity: this.state.blink ? 0 : 1,
            position: 'fixed',
            letterSpacing: 12,
            top: 50,
            fontSize: 32,
            width: '100%',
          }}>
          It's Party Time!
        </h3>
        <h3
          className='yellow center'
          style={{
            textTransform: 'uppercase',
            opacity: this.state.blink ? 1 : 0,
            position: 'fixed',
            letterSpacing: 12,
            bottom: 50,
            fontSize: 32,
            width: '100%',
          }}>
          Press Any Button
        </h3>
      </div>
    );
  }
}
