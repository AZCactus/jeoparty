import React, { Component, PropTypes } from 'react';
import Question from './Question';

export default class Questions extends Component {
  constructor() {
    super();

    this._renderQuestions = this._renderQuestions.bind(this);
  }

  _renderQuestions(value) {
    const {
      questions,
    } = this.props;
    let components = [];

    questions.forEach( (question, i) => {
      components.push( <Question key={`category-${i}`} points={ (i+1) * value } {...question} onSelect={this.props.onSelect} /> );
    });

    return components;
  }

  render() {

    return (
      <div>{this._renderQuestions(100)}</div>
    );
  }
}

Questions.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
