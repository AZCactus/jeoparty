import alt from '../alt';

class GameActions {
  constructor() {
    this.generateActions(
      'buzzListen',
      'changeView',
      'clearInterval',
      'clearTimer',
      'ledOff',
      'ledOn',
      'ledStrobe',
      'setInterval',
      'setTimer',
      'togglePlayer',
      'createStatement',
    );
  }
}

export default alt.createActions(GameActions);
