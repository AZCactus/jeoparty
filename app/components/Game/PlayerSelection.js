import React, { Component } from 'react';
import GameActions from '../../actions/GameActions';
import _ from 'lodash';


export default class PlayerSelection extends Component {

  constructor() {
    super();

    this.onTimesUp = this.onTimesUp.bind(this);
    this.onBuzz = this.onBuzz.bind(this);
  }

  componentDidMount() {
    GameActions.buzzListen.defer(this.onBuzz);
    GameActions.setTimer.defer({
      callback: this.onTimesUp,
      seconds: 5,
    });
  }


  onTimesUp() {
    if (Object.keys(this.props.players).length) {
      GameActions.changeView.defer("board");
    } else {
      GameActions.changeView.defer(null);
    }
  }

  onBuzz(data) {
    GameActions.togglePlayer(data.player);
    if (Object.keys(this.props.players).length === 3) {
      GameActions.clearTimer();
      GameActions.changeView("board");
    }
  }


  _renderPlayers(players) {

    return _.map([1,2,3], (id) => {
      return (
        <div key={`player-select-${id}`} className="flex flex-column flex-center" style={{opacity: players[id] ? 1 : "0.5"}}>
          <div style={{fontSize: 28, textTransform: "uppercase"}}>Player</div>
          <div className={`${players[id] ? "yellow" : "white"}`} style={{fontSize: 82}}>{id}</div>
        </div>
      );
    });
  }

  render() {
    const {
      players,
      seconds,
    } = this.props;

    return (
      <div className="view flex flex-column flex-start flex-center flex-middle">
        <header className="full-x" style={{textAlign: "center"}}>
          <h2 className="yellow" style={{textTransform: "uppercase", fontSize: 44}}>Who's Ready To Party?</h2>
          <h5>{seconds}</h5>
          <h3>Buzz In To Join Jeoparty</h3>
        </header>
        <div className="flex flex-justify" style={{margin: "50px auto 0", width: "80%", textAlign: "center"}}>
          {this._renderPlayers(players)}
        </div>
      </div>
    );
  }
}

PlayerSelection.defaultProps = {
  players: {},
};
