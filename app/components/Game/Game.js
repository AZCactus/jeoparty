import React, { Component, PropTypes } from 'react';

import Home from '../Game/Home';
import PlayerSelection from '../Game/PlayerSelection';
import Board from '../Board/Board';

import GameStore from '../../stores/GameStore';

import _ from 'lodash';


export default class Game extends Component {

  constructor() {
    super();

    this.state = GameStore.getState();

    this.onChange = this.onChange.bind(this);
    this._renderView = this._renderView.bind(this);
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


  _renderLoading() {
    return (
      <p>Loading...</p>
    );
  }


  _renderView(view, players) {
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
  }

}

Game.defaultProps = {
  loading: true,
};

Game.propTypes = {
  loading: PropTypes.bool,
};
