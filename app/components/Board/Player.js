import React, { Component, PropTypes } from 'react';

export default class Player extends Component {

  render() {
    const {
      active,
      buzzing,
      lighten,
      id,
      score,
      wrong,
    } = this.props;

    const borderBlack = '2px solid black';

    return (
      <div className='flex flex-center flex-column flex-middle' style={{opacity: lighten ? 0.5 : 1}}>
        <div style={{width: '100%', marginBottom: 5, border: '2px solid white', height: 10, backgroundColor: buzzing ? 'red' : 'inherit'}}></div>
        <div style={{backgroundColor: buzzing ? 'white' : 'blue', textAlign: 'center', border: borderBlack}}>
          <h3 style={{padding: '5px 10px', fontSize: 18, backgroundColor: 'blue', borderBottom: borderBlack}}>${score}</h3>
          <h2 style={{margin: '10px 0 20px', padding: 10, fontSize: 20, backgroundColor: 'blue', borderTop: borderBlack, borderBottom: borderBlack}}>Player {id}</h2>
        </div>
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
