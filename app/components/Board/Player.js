import React, { Component, PropTypes } from 'react';

export default class Player extends Component {

  render() {
    const {
      active,
      buzzing,
      id,
      score,
      wrong,
    } = this.props;

    return (
      <div className="flex flex-center flex-column flex-middle">
        <h2>{buzzing ? "buzzing!" : ""}{wrong ? "wrong!" : ""}</h2>
        <h3>Player {id}</h3>
        <h4>${score}</h4>
      </div>
    );
  }
}

Player.propTypes = {
  id: PropTypes.number.isRequired,
  buzzing: PropTypes.bool,
  score: PropTypes.number.isRequired,
  active: PropTypes.bool,
  wrong: PropTypes.bool,
}
