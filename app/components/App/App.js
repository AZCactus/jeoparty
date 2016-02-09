// LIBRARY
import React, { Component } from 'react';

// COMPONENT
import Canvas from '../Canvas/Canvas';
import Home from '../Home/Home';
import PlayerSelection from '../Home/PlayerSelection';
import HtmlHeaderTags from '../Document/HtmlHeaderTags';

// FLUX
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';

if (process.env.BROWSER) {
  require('./_App.scss');
  require('./_App.sass');
  require('file?name=favicon.ico!../../images/favicon.ico');
}

export default class App extends Component {
  //
  // static getStores(props) {
  //   return [AppStore];
  // }
  //
  // static getPropsFromStores(props) {
  //   return AppStore.getState();
  // }

  // constructor() {
  //   super();
  //
  //   this._renderApp = this._renderApp.bind(this);
  //   this.handleButtonTap = this.handleButtonTap.bind(this);
  // }
  //
  //
  // componentDidMount() {
  //
  //   if (!('webkitSpeechRecognition' in window)) {
  //     console.log('you don\'t have speech recog');
  //   } else {
  //     AppActions.loading(false);
  //   }
  // }
  //
  // handleButtonTap() {
  //   this.setState({selecting: true});
  // }
  //
  // _renderLoading() {
  //   return (
  //     <p>Loading...</p>
  //   );
  // }

  // _renderApp(selecting) {
  //   let component = <Home onButtonTap={this.handleButtonTap} />
  //
  //   if (selecting) {
  //     component = <PlayerSelection />
  //   }
  //
  //   return (
  //     <div className='main-content'>
  //       {component}
  //     </div>
  //   );
  // }

  render() {
    // const {
    //   loading,
    // } = this.state;

    // return (
    //   <div>
    //     <HtmlHeaderTags />
    //     { loading ? this._renderLoading() : this._renderApp(this.state.selecting) }
    //   </div>
    // );
    return (
      <div>
        <HtmlHeaderTags />
        <Canvas />
      </div>
    );
  }
}

App.prototype.displayName = 'App';
