import React, {Component} from 'react';
import Clue from './Clue';
import Answer from './Answer';
import connectToStores from 'alt/utils/connectToStores';
import QuestionStore from '../../stores/QuestionStore';
import QuestionActions from '../../actions/QuestionActions';

import io from 'socket.io-client';


class Question extends Component {

  static getStores(props) {
    return [QuestionStore];
  }

  static getPropsFromStores(props) {
    return QuestionStore.getState();
  }

  componentDidMount() {

    this._listenToButton();
  }

  _listenToButton() {
    console.log("trying to listen to button")
    let socket = io();
    socket.on('rec', function (data) {
      console.log(data);
      QuestionActions.buzz(data.player);
      QuestionActions.recordAnswer();
    });
  }

  _renderResult(correct) {
    return <p>{correct ? "Correct" : "Incorrect"}</p>;
  }

  _renderActivePlayer(id) {
    return (
      <h3>{`Player ${id}`}</h3>
    );
  }

  render() {
    const {
      activePlayer,
      answer,
      answered,
      clue,
      correct,
      recordedAnswer,
    } = this.props;

    return (
      <section>
        <h2>Just a category / value</h2>
        <Clue text={clue} />
        <Answer text={answer} />
        {activePlayer ? this._renderActivePlayer(activePlayer) : void 0}
        <p>{recordedAnswer}</p>
        {answered ? this._renderResult(correct) : void 0}
        <a onClick={QuestionActions.recordAnswer}>Rec</a>
      </section>
    );
  }
}
module.exports =  connectToStores(Question)
