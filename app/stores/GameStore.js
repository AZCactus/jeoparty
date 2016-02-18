// FLUX
import GameActions from '../actions/GameActions';
import Immutable, {Map} from 'immutable';

// DEPENDENCY
import alt from '../alt';
import io from 'socket.io-client';


class GameStore {
  constructor() {
    this.state = {
      buzzListener: null,
      intervalCallback: null,
      players: {},
      timerCallback: null,
      view: null,
    };

    if (process.env.BROWSER) {

      // socket.io
      this.socket = io();
      this.socket.on('rec', (data) => {
        const {
          buzzListener,
        } = this.state;
        if (typeof buzzListener === "function") {
          buzzListener(data);
        }
      });

      // webkitSpeechRecognition
      let recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      this.recognition = recognition;
      this.recognition.start();
    }

    this.bindActions(GameActions);
  }

  onBuzzListen(func) {
    this.state.buzzListener = func;
  }

  onChangeView(str) {
    this.socket.emit("led-stop");
    this.state.buzzListener = null;
    GameActions.clearTimer.defer();
    GameActions.clearInterval.defer();
    this.state.view = str;
  }

  onClearTimer() {
    if (!this.state.timerCallback) {
      clearTimeout(this.state.timerCallback);
      this.state.timerCallback = null;
    }
  }

  onClearInterval() {
    if (!this.state.intervalCallback) {
      clearInterval(this.state.intervalCallback);
      this.state.intervalCallback = null;
    }
  }

  onLedOff(id) {
    if (id) {
      this.socket.emit(`led-off-${id}`);
    } else {
      this.socket.emit("led-stop");
    }
  }

  onLedOn(id) {
    this.socket.emit(`led-on-${id}`);
  }

  onLedStrobe(id) {
    if (id) {
      this.socket.emit(`led-strobe-${id}`);
    } else {
      this.socket.emit(`led-strobe-all`);
    }
  }

  onSetInterval(obj) {
    this.state.intervalCallback = obj.callback;
    setInterval(() => {
      this.state.intervalCallback();
    }, obj.time);
  }

  onSetTimer(obj) {
    this.state.timerCallback = obj.callback;
    setTimeout(() => {
      this.state.timerCallback();
    }, obj.time);
  }

  onTogglePlayer(id) {
    let {
      players,
    } = this.state;

    if (players[id]) {
      delete players[id];
      this.socket.emit(`led-off-${id}`);
    } else {
      this.socket.emit(`led-on-${id}`);
      players[id] = {id: id, score: 0, wrong: false};
    }

    this.state.players = players;
  }
  //
  // onCreateStatement() {
  //   let recognition = new webkitSpeechRecognition();
  //   recognition.lang = 'en-US';
  // }
  //
  // onToggleLoading(bool) {
  //   if (bool) {
  //     this.setState({
  //       loading: bool,
  //     });
  //   } else {
  //     this.setState({
  //       loading: !this.state.loading,
  //     });
  //   }
  // }
}

export default alt.createStore(GameStore, 'GameStore');
