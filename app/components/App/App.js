// LIBRARY
import React, { Component } from 'react';

// COMPONENT
import Game from '../Game/Game';
import HtmlHeaderTags from '../Document/HtmlHeaderTags';

if (process.env.BROWSER) {
  require('./_App.scss');
  require('./_AppLayout.scss');
}

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  handleToggleLoading(bool) {
    this.setState({
      loading: bool,
    });
  }


  render() {

    return (
      <div>
        <HtmlHeaderTags />
        <Game {...this.state} toggleLoading={this.handleToggleLoading.bind(this)} />
      </div>
    );
  }
}
