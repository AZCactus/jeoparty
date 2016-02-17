import React, {Component} from 'react';
import io from 'socket.io-client';

import VelocityComponent from 'velocity-react/velocity-component';

export default class PlayerSelection extends Component {


  componentDidMount() {
    const socket = io();
    socket.emit("led-stop");

    this.timer = setTimeout(() => {
      this.props.onToggleSelectionView(false);
      const socket = io();
      const callback = (obj) => {
        this.props.onTogglePlayer(obj.player)
      };

      socket.on('rec', function (data) {
        callback(data);
      });
    }, 10000)
  }

  componentWillUnmount() {
    const socket = io();
    socket.removeListener('rec');
    clearTimeout(this.timer);
  }


  render() {

    const {
      players,
    } = this.props;

    const duration = 100;

    return (
      <div className="view flex flex-column flex-start flex-center">
        <header className="full-x" style={{textAlign: "center"}}>
          <h2 style={{textTransform: "uppercase", fontSize: 44, color: "gold"}}>Who's Ready To Party?</h2>
          <h3>Buzz In To Join Jeoparty</h3>
        </header>
        <div className="flex flex-justify" style={{margin: "50px auto 0", width: "80%", textAlign: "center"}}>
          <VelocityComponent duration={duration} animation={{opacity: players["1"] ? 1 : "0.5"}}>
            <div className="flex flex-column flex-center"><div style={{fontSize: 28, textTransform: "uppercase"}}>Player</div><div style={{fontSize: 82, color: players["1"] ? "gold" : "white" }}>1</div></div>
          </VelocityComponent>
          <VelocityComponent duration={duration} animation={{opacity: players["2"] ? 1 : "0.5", color: players["2"] ? "gold" : "white" }}>
            <div className="flex flex-column flex-center"><div style={{fontSize: 28, textTransform: "uppercase"}}>Player</div><div style={{fontSize: 82, color: players["2"] ? "gold" : "white" }}>2</div></div>
          </VelocityComponent>
          <VelocityComponent duration={duration} animation={{opacity: players["3"] ? 1 : "0.5", color: players["3"] ? "gold" : "white" }}>
            <div className="flex flex-column flex-center"><div style={{fontSize: 28, textTransform: "uppercase"}}>Player</div><div style={{fontSize: 82, color: players["3"] ? "gold" : "white" }}>3</div></div>
          </VelocityComponent>
        </div>
      </div>
    );
  }
}
