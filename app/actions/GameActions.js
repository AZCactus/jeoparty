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
      'tick',
      'togglePlayer',
      'createStatement',
    );
  }
}

export default alt.createActions(GameActions);
