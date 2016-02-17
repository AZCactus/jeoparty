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
        className="flex flex-middle"
        style={{borderLeft: "2px solid black", borderTop: "2px solid black"}}
        onClick={answered ? void 0 : onSelect.bind(this, {answer: answer, clue: clue, points: points, id: id})}
      >
        <h3 style={{opacity: answered ? 0 : 1, color: "gold", margin: 0, padding:"25px 0"}}>${points}</h3>
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
