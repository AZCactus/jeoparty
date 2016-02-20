import alt from '../alt';

class GameActions {
  constructor() {
    this.generateActions(
      'buzzListen',
      'changeView',
      'clearTimer',
      'ledOff',
      'ledOn',
      'ledStrobe',
      'setTimer',
      'recordStatement',
      'tick',
      'togglePlayer',
    );
  }
}

export default alt.createActions(GameActions);
