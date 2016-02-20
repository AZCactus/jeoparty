import React, { Component, PropTypes } from 'react';
import Category from './Category';
import Questions from './Questions';

import GameActions from '../../actions/GameActions';

import _ from 'lodash';

export default class Categories extends Component {

  constructor() {
    super();

    this._renderCategories = this._renderCategories.bind(this);
  }


  componentDidMount() {
    GameActions.ledOff.defer();

    if (this.props.activePlayer) {
      GameActions.ledOn.defer(this.props.activePlayer);
    } else {

      const rand = _.sample(this.props.players).id
      GameActions.ledOn.defer(rand);
      this.props.setActivePlayer(rand);

    }
  }


  _renderCategories() {
    const {
      categories,
      onSelect,
      questions,
    } = this.props;
    let components = [];

    Object.keys(categories).forEach( id => {
      components.push(
        <Category key={`category-${categories[id].id}`} title={categories[id].title}>
          <Questions onSelect={onSelect} questions={_.filter(questions, {categoryId: parseInt(id)})} />
        </Category>
      );
    });

    return components;
  }

  render() {
    const {
      categories,
    } = this.props;

    return (
      <div className="view bg-purple" style={{padding: '0 10px'}}>
        <div
          className="flex flex-justify flex-start bg-blue br-black bb-black"
          style={{margin: '10px auto 0'}}>
          {Object.keys(categories).length ? this._renderCategories() : void 0}
        </div>
      </div>
    );
  }
}
