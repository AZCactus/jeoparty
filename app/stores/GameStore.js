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
      seconds: 0,
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
    clearTimeout(GameActions.tick);
    this.state.timerCallback = null;
    this.state.view = str;
  }

  onClearTimer() {
    clearTimeout(GameActions.tick);
    this.state.timerCallback = null;
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
    this.state.seconds = obj.seconds;
    setTimeout(GameActions.tick, 1000);
  }

  onTick() {
    if (this.state.seconds > 1 && this.state.timerCallback) {
      this.state.seconds = this.state.seconds - 1;
      setTimeout(GameActions.tick, 1000);
    } else {

      if (this.state.timerCallback) {
        this.state.timerCallback();
      }

      GameActions.clearTimer.defer();

    }
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
