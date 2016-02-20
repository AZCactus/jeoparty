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
      <div
        className={`flex flex-center flex-column flex-middle ${active ? 'b-white' : 'b-black'} ${buzzing ? 'bg-white' : 'bg-blue'}`}
        style={{borderRadius: 6, padding: '10px 5px'}}>
        <h1
          className='bg-purple center full-x b-black'
          style={{borderRadius: 3, fontSize: 14, padding: '5px 10px', marginBottom: 10}}>
          ${ score}
        </h1>
        <h2
          className='bg-purple center full-x b-black'
          style={{borderRadius: 3, fontSize: 12, padding: '5px 10px', letterSpacing: 3}}>
          PLAYER {id}
        </h2>
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
