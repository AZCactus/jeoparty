import React, { Component, PropTypes } from 'react';
import Category from './Category';
import Questions from './Questions';

import _ from 'lodash';
import io from 'socket.io-client';

export default class Categories extends Component {

  constructor() {
    super();

    this._renderCategories = this._renderCategories.bind(this);
  }


  componentDidMount() {
    const socket = io();
    socket.emit(`led-stop`);

    if (this.props.activePlayer) {

      socket.emit(`led-on-${this.props.activePlayer}`);

    } else {

      const rand = _.sample(this.props.players).id
      socket.emit(`led-on-${rand}`);
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
      <div className="view flex flex-justify flex-start">
        {Object.keys(categories).length ? this._renderCategories() : void 0}
      </div>
    );
  }
}
