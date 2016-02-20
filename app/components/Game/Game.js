import React, { Component, PropTypes } from 'react';

// COMPONENTS
import Home from '../Game/Home';
import PlayerSelection from '../Game/PlayerSelection';
import Board from '../Board/Board';

import GameStore from '../../stores/GameStore';
import GameActions from '../../actions/GameActions';

import _ from 'lodash';

export default class Game extends Component {

  constructor() {
    super();

    this.state = GameStore.getState();

    this.onChange = this.onChange.bind(this);
    this._renderView = this._renderView.bind(this);

    this._renderCanvas = this._renderCanvas.bind(this);
    this.handleAddPoints = this.handleAddPoints.bind(this);
    this.handleToggleWrong = this.handleToggleWrong.bind(this);
    this.handleResetWrong = this.handleResetWrong.bind(this);
  }


  componentDidMount() {
    GameStore.listen(this.onChange);

    if (!('webkitSpeechRecognition' in window)) {
      console.log('you don\'t have speech recog');
    } else {
      this.props.toggleLoading(false);
    }
  }

  componentWillUnmount() {
    GameStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }


  handleToggleWrong(id, bool) {
    let {
      players,
    } = this.state;

    players[id].wrong = bool;

    this.setState({
      players: players,
    });
  }


  handleAddPoints(id, points) {
    let players = this.state.players;
    players[id].score = parseInt(players[id].score) + parseInt(points);

    this.setState({
      players: players,
    });
  }


  handleResetWrong() {
    let players = this.state.players;
    const wrongPlayers = _.filter(players, {wrong: true});

    console.log(wrongPlayers);
    wrongPlayers.forEach( player => {
      players[player.id].wrong = false;
    });

    this.setState({
      players: players,
    });
  }


  _renderLoading() {
    return (
      <p>Loading...</p>
    );
  }


  _renderCanvas(selecting, players) {

    const playerCount = Object.keys(players).length;

    let component = playerCount ?
      <Board
        onAddPoints={this.handleAddPoints}
        onResetWrong={this.handleResetWrong}
        onToggleWrong={this.handleToggleWrong}
        onTogglePlayer={this.handleTogglePlayer}
        onToggleSelectionView={this.handleToggleSelectionView}
        players={_.filter(this.state.players, {wrong: false})}
      /> :
      <Home onToggleSelectionView={this.handleToggleSelectionView} />

    if (selecting) {
      component = <PlayerSelection players={players} onTogglePlayer={this.handleTogglePlayer} onToggleSelectionView={this.handleToggleSelectionView} />
    }

    return component;
  }

  _renderView(view, players) {
    console.log("rendering view", view)

    let component;

    switch(view) {
      case "select":
        component = <PlayerSelection key="player-selection" players={players} seconds={this.state.seconds} />;
        break;
      case "board":
        component = <Board key="board" players={_.toArray(players)} seconds={this.state.seconds} />;
        break;
      default:
        component = <Home key="home" />
    }

    return component;
  }

  render() {
    const {
      players,
      view,
    } = this.state;

    return (
      <div>
        { this.props.loading ? this._renderLoading() : this._renderView(view, players)}
      </div>
    );
    // return (
    //   <div style={{textAlign: "center", height: "100%"}}>
    //     { this.props.loading ? this._renderLoading() : <Board players={_.filter(this.state.players, {wrong: false})} onAddPoints={this.handleAddPoints} onToggleWrong={this.handleToggleWrong} onResetWrong={this.handleResetWrong} /> }
    //   </div>
    // );
  }

}

Game.defaultProps = {
  loading: true,
};
