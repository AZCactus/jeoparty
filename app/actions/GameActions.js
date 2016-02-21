import alt from '../alt';

class GameActions {
  constructor() {
    this.generateActions(
      'addPoints',
      'buzzListen',
      'changeView',
      'clearTimer',
      'flushPlayers',
      'ledActivePlayers',
      'ledOff',
      'ledOn',
      'ledStrobe',
      'setTimer',
      'recordStatement',
      'tick',
      'togglePlayer',
      'updatePlayerValidity',
    );
  }
}

export default alt.createActions(GameActions);
