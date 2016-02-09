// FLUX
import QuestionActions from '../actions/QuestionActions';

import io from 'socket.io-client';

// let socket = io();
// socket.on('news', function (data) {
//   console.log(data);
// });

// DEPENDENCY
import alt from '../alt';

// webpack hot reload
import makeHot from 'alt/utils/makeHot';

let questionStore = makeHot(alt, class questionStore {
  constructor() {
    this.bindActions(QuestionActions);
    // this.bindAction(QuestionActions.fetchQuestion, this.onFetchQuestion);
    this.state = {
      activePlayer: null,
      answer: 'a blinking light',
      answered: false,
      clue: 'Something very rare is "as scarce as" these poultry features (that don\'t exist)',
      correct: false,
      recordedAnswer: null,
      recording: false,
    };
  }

  onBuzz(id) {
    if (!this.state.activePlayer) {
      this.setState({activePlayer: id});
      console.log('set active player to ' + id);
    }
  }

  onSetClue(text) {
    console.log('text clue');
    this.state.clue = text;
  }

  onSetAnswer(text) {
    console.log('text answer');
    this.state.answer = text;
  }

  onRecordAnswer() {
    if (!this.state.recording && this.state.activePlayer) {
      console.log(this.state.activePlayer);
      let socket = io();

      let recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('recording');
        this.setState({
          recording: true,
        });
      };

      recognition.onresult = (event) => {
        console.log(event.results[0][0].transcript);
        this.setState({
          recordedAnswer: event.results[0][0].transcript,
        });
        this.validateAnswer();
      };

      recognition.onend = () => {
        socket.emit('led-stop');
        console.log('ended');
        this.setState({
          activePlayer: null,
          recording: false,
        });
      };

      socket.emit(`led-strobe-${this.state.activePlayer}`);
      recognition.start();
    }
  }

  validateAnswer() {
    // console.log(this.state)
    const {
      answer,
      recordedAnswer,
    } = this.state;

    // let correct = false

    this.setState({
      answered: true,
      correct: recordedAnswer.search(answer) !== -1,
    });
  }

  // onFetchQuestion(data) {
  //   console.log(data);
  //   //this.setState(this.state.set('dataByRestApi', Immutable.fromJS({data: 'hello'})));
  //   // this.setState(this.state.set('dataByRestApi', Immutable.fromJS({data: data})));
  // }

}, 'QuestionStore');

export default questionStore;
