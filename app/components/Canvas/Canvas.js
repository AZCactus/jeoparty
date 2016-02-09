import React, { Component } from 'react';

// COMPONENTS
import Home from '../Home/Home';
import PlayerSelection from '../Home/PlayerSelection';

// FLUX
import connectToStores from 'alt/utils/connectToStores';
import CanvasStore from '../../stores/CanvasStore';
import CanvasActions from '../../actions/CanvasActions';



class Canvas extends Component {

  static getStores(props) {
    return [CanvasStore];
  }

  static getPropsFromStores(props) {
    return CanvasStore.getState();
  }

  constructor() {
    super();

    this._renderCanvas = this._renderCanvas.bind(this);
    this.handleButtonTap = this.handleButtonTap.bind(this);
  }


  componentDidMount() {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('you don\'t have speech recog');
    } else {
      CanvasActions.loading(false);
    }
  }

  handleButtonTap() {
    CanvasActions.selectPlayers(true);
  }

  _renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  _renderCanvas(selecting) {
    let component = <Home onButtonTap={this.handleButtonTap} />

    if (selecting) {
      component = <PlayerSelection players={this.props.players} />
    }

    return (
      <div className='main-content'>
        {component}
      </div>
    );
  }

  render() {
    const {
      props,
    } = this;

    console.log(this.props)

    debugger

    // return (
    //   <div>
    //     { loading ? this._renderLoading() : this._renderCanvas(selecting) }
    //   </div>
    // );
    return (
      <div>
        yo
      </div>
    );
  }

}

export default connectToStores(Canvas);
