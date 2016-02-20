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
      <footer style={{position: "fixed", bottom: 5, width: "100%"}}>
        <div className="flex flex-justify" style={{width: '80%', margin: '0 auto'}}>
          {this._renderPlayers(this.props.players, this.props.buzzed)}
        </div>
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
