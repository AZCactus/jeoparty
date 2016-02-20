import React, { Component, PropTypes } from 'react';
import GameActions from '../../actions/GameActions';


export default class Answering extends Component {

  constructor() {
    super();

    this.state = {
      answered: false,
      statement: null,
      valid: null,
    };
  }

  componentDidMount() {
    const config = {
      player: this.props.buzzed,
      onresult: this._setStatement.bind(this),
      onend: this._endRecord.bind(this),
    };

    GameActions.recordStatement(config);
    GameActions.ledStrobe(this.props.buzzed);
  }

  _validate() {
    const {
      statement,
    } = this.state;

    const {
      answer,
      buzzed,
      points,
      players,
      reset,
      setActivePlayer,
      success,
    } = this.props;

    if (statement && statement.toLowerCase().search(answer.toLowerCase()) !== -1 ) {
      this.setState({valid: true});
      GameActions.addPoints({id: buzzed, points: points});

      setTimeout(() => {
        setActivePlayer(buzzed);
        success();
      }, 2000);

    } else {
      GameActions.addPoints({id: buzzed, points: -points});
      GameActions.updatePlayerValidity({id: buzzed, valid: false});
      reset();
    }

  }


  _setStatement(event) {
    this.setState({statement: event.results[0][0].transcript})
  }


  _endRecord() {
    GameActions.ledOff();
    this._validate();
  }


  _renderValidity(statement, valid) {
    const message = valid ? 'Correct!' : 'Wrong!';
    const color = valid ? 'green' : 'red';

    return (
      <div className='center' style={{padding: '10px 20px', backgroundColor: color}}>
        <h2 style={{fontSize: 24, marginBottom: 10}}>{message}</h2>
        <h3 style={{fontSize: 18}}>{statement}</h3>
      </div>
    );
  }


  render() {
    const {
      statement,
      valid,
    } = this.state;

    // cheat mode
    console.log(this.props.answer);

    return (
      <div className='flex flex-middle flex-column' style={{height: '75%'}}>
        <h1 key='answering-player' className='center yellow' style={{marginBottom: 20}}>PLAYER {this.props.buzzed}!</h1>
        { statement ? this._renderValidity(statement, valid) :  <h2 key='status-recording' className='white center' style={{backgroundColor: 'red', marginTop: 10, fontSize: 12, padding: '5px 10px'}}>Recording...</h2> }
      </div>
    );
  }

}


Answering.propTypes = {
  buzzed: PropTypes.number.isRequired,
  end: PropTypes.func.isRequired,
  setActivePlayer: PropTypes.func.isRequired,
}
