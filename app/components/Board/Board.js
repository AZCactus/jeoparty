import React, { Component, PropTypes } from 'react';
import Categories from './Categories';
import Challenge from './Challenge';
import Scoreboard from './Scoreboard';
import End from './End';

import GameActions from '../../actions/GameActions';

import _ from 'lodash';
import reqwest from 'reqwest';
import io from 'socket.io-client';
import striptags from 'striptags';

export default class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activePlayer: null,
      categories: {},
      challenge: null,
      buzzed: null,
      questions: {},
      statement: null,
    }

    this.sortRandomCluesForCategories = this.sortRandomCluesForCategories.bind(this);
    this.buildCategoryBoard = this.buildCategoryBoard.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.handleBuzz = this.handleBuzz.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
    this._renderBoardState = this._renderBoardState.bind(this);
  }


  flush() {
    this.setState({
      activePlayer: null,
      categories: {},
      challenge: null,
      buzzed: null,
      questions: {},
      statement: null,
    });

    this.props.players.forEach(player => {
      this.props.onTogglePlayer(player.id);
    });

    this.props.onToggleSelectionView(false);
  }


  componentDidMount() {
    this.fetch("/api/random", {count: 12}, this.sortRandomCluesForCategories)
  }


  sortRandomCluesForCategories(array) {
    let categories = []

    _.shuffle(array).forEach(clue => {
      if (categories.indexOf(clue.category.id) > -1 || categories.length > 5) {
        console.log("limiting")
      } else {
        categories.push(clue.category.id)
      }
    });

    this.buildCategoryBoard(categories);
  }


  buildCategoryBoard(categories) {
    categories.forEach( id => {
      this.fetch('/api/category', {id: id}, this.addCategory)
    });
  }


  addCategory(category) {
    let categories = this.state.categories;
    let questions = this.state.questions;

    const find = '[",\'()]';
    const re = new RegExp(find, 'g');

    categories[category.id] = {
      id: category.id,
      title: category.title,
    };

    category.clues.slice(0,5).forEach(clue => {

      questions[clue.id] = {
        id: clue.id,
        categoryId: category.id,
        answered: false,
        clue: clue.question,
        answer: striptags(clue.answer.replace(re, '').replace('&', 'and')),
      }
    });

    this.setState({
      categories: categories,
      questions: questions,
    });
  }


  fetch(path, data, callback) {
    reqwest({
      url: `https://jservice.io${path}`,
      type: "json",
      crossOrigin: true,
      method: "get",
      data: data,
      success: (res) => {
        callback(res)
      },
    });
  }


  handleSelect(object) {
    let questions = this.state.questions;
    questions[object.id].answered = true;

    this.setState({
      challenge: object,
      questions: questions,
    });
  }

  _setStatement(event) {
    this.setState({
      statement: event.results[0][0].transcript,
    });
  }

  _endRecord() {
    GameActions.ledOff();
    this.validateAnswer();
  }

  handleBuzz(obj) {
    // console.log(player)
    // console.log(this.props.players)
    // console.log(_.filter(this.props.players, {id: player}))
    const player = obj.player;

    if (_.filter(this.props.players, {id: player}).length > 0) {
      this.setState({
        buzzed: player,
      });

      const config = {
        player: player,
        onresult: this._setStatement.bind(this),
        onend: this._endRecord.bind(this),
      };

      GameActions.recordStatement(config);
    }
  }


  handleSetActivePlayer(id) {
    this.setState({activePlayer:id})
  }


  validateAnswer() {
    const {
      answer,
      buzzed,
      challenge,
      statement,
    } = this.state;

    const {
      onAddPoints,
      onToggleWrong,
      players,
    } = this.props;

    if (statement && statement.toLowerCase().search(challenge.answer.toLowerCase()) !== -1 ) {

      onAddPoints(buzzed, challenge.points);
      this.setState({
        activePlayer: buzzed,
        buzzed: null,
        challenge: null,
      });

    } else {

      onToggleWrong(buzzed, true);
      onAddPoints(buzzed, -challenge.points);

      this.setState({
        buzzed: null,
      });

      if (players.length < 2) {
        this.resetChallenge();
      }

    }
  }


  resetChallenge() {
    this.setState({
      challenge: null,
      buzzed: null,
    });
  }


  _renderBoardState(questions) {
    const {
      activePlayer,
      categories,
    } = this.state;

    console.log(_.filter(questions, {answered: true}))

    const answeredQuestions = _.filter(questions, {answered: true}).length

    if (answeredQuestions < 30) {
      return <Categories
        onSelect={this.handleSelect.bind(this)}
        setActivePlayer={this.handleSetActivePlayer.bind(this)}
        activePlayer={activePlayer}
        categories={categories}
        players={this.props.players}
        questions={questions} />;
    } else {
      const winner = _.last(_.sortBy(this.props.players, 'score'));
      console.log(winner)
      return <End flush={this.flush.bind(this)} {...winner} />;
    }
  }


  render() {
    const {
      activePlayer,
      buzzed,
      challenge,
      questions,
      statement,
    } = this.state;

    return (
      <div>
        { challenge ?
          <Challenge
            {...challenge}
            seconds={this.props.seconds}
            buzzed={buzzed}
            statement={statement}
            onBuzz={this.handleBuzz}
            reset={this.resetChallenge.bind(this)} /> :
          this._renderBoardState(questions)
        }
        <Scoreboard players={this.props.players} activePlayer={activePlayer} buzzed={buzzed} challenge={challenge} />
      </div>
    );
  }

}
