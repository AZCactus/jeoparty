import React, { Component, PropTypes } from 'react';

// COMPONENTS
import Home from '../Game/Home';
import PlayerSelection from '../Game/PlayerSelection';
import Board from '../Board/Board';

import _ from 'lodash';
import io from 'socket.io-client';


export default class Game extends Component {

  constructor() {
    super();

    this.state = {
      players: {},
      selectionView: false,
    }

    this._renderCanvas = this._renderCanvas.bind(this);
    this.handleTogglePlayer = this.handleTogglePlayer.bind(this);
    this.handleToggleSelectionView = this.handleToggleSelectionView.bind(this);
    this.handleAddPoints = this.handleAddPoints.bind(this);
    this.handleToggleWrong = this.handleToggleWrong.bind(this);
    this.handleResetWrong = this.handleResetWrong.bind(this);
  }


  componentDidMount() {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('you don\'t have speech recog');
    } else {
      this.props.toggleLoading(false);

      // hack for microphone
      let recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();
    }
  }


  handleTogglePlayer(id) {
    let {
      players,
    } = this.state;

    const socket = io();

    if (players[id]) {
      delete players[id];
      socket.emit(`led-off-${id}`);
    } else {
      socket.emit(`led-on-${id}`);
      players[id] = {id: id, score: 0, wrong: false};
    }

    this.setState({
      players: players,
      selectionView: Object.keys(players).length === 3 ? false : true,
    });
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


  handleToggleSelectionView(bool) {
    this.setState({
      selectionView: bool,
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

    if (selecting && !playerCount) {
      component = <PlayerSelection players={players} onTogglePlayer={this.handleTogglePlayer} onToggleSelectionView={this.handleToggleSelectionView} />
    }

    return component;
  }

  render() {
    const {
      players,
      selectionView,
    } = this.state;

    return (
      <div>
        { this.props.loading ? this._renderLoading() : this._renderCanvas(selectionView, players) }
      </div>
    );
    // return (
    //   <div style={{textAlign: "center", height: "100%"}}>
    //     { this.props.loading ? this._renderLoading() : <Board players={_.filter(this.state.players, {wrong: false})} onAddPoints={this.handleAddPoints} onToggleWrong={this.handleToggleWrong} onResetWrong={this.handleResetWrong} /> }
    //   </div>
    // );
  }

}
