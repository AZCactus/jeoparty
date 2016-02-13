import React, { Component, PropTypes } from 'react';
import Player from './Player';


export default class Scoreboard extends Component {


  _renderPlayers(players, buzzed) {
    let components = [];

    players.forEach( player => {
      components.push(<Player key={player.id} {...player} buzzing={player.id === buzzed} />);
    });

    return components;
  }


  render() {

    return (
      <footer className="flex flex-justify" style={{position: "fixed", bottom: 0, width: "100%"}}>
        {this._renderPlayers(this.props.players, this.props.buzzed)}
      </footer>
    );
  }
}


Scoreboard.defaultProps = {
  players: [
    {
      id: 1,
      score: 0,
    },
    {
      id: 2,
      score: 0,
    },
    {
      id: 3,
      score: 0,
    },
  ]
}

Scoreboard.propTypes = {
  players: PropTypes.array,
  buzzed: PropTypes.number,
}
