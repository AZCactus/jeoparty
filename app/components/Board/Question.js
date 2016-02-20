import React, { Component, PropTypes } from 'react';

export default class Question extends Component {

  render() {
    const {
      answer,
      answered,
      clue,
      id,
      onSelect,
      points,
    } = this.props;

    return (
      <div
        key={`question-${id}`}
        className='flex flex-middle bl-black bt-black'
        onClick={answered ? void 0 : onSelect.bind(this, {answer: answer, clue: clue, points: points, id: id})}
      >
        <h3 className='yellow' style={{opacity: answered ? 0 : 1, margin: 0, padding: '15px 0'}}>${points}</h3>
      </div>
    );
  }
}

Question.propTypes = {
  answer: PropTypes.string.isRequired,
  answered: PropTypes.bool.isRequired,
  clue: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
};
