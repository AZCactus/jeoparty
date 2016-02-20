import React, { Component, PropTypes } from 'react';

export default class Category extends Component {

  render() {

    return (
      <div className="flex flex-column center" style={{width: `${100 / 6}%`}}>
        <header className="flex flex-center flex-middle bl-black bt-black" style={{width: "100%", textTransform: "uppercase", height:60}}>
          <span style={{padding: "0 10px", fontWeight: "bold", fontSize: 12}}>{this.props.title}</span>
        </header>
        {this.props.children}
      </div>
    );
  }
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
};
