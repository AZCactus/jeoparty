import React, { Component, PropTypes } from 'react';

export default class Category extends Component {

  render() {

    return (
      <div style={{width: `${100 / 6}%`, textAlign: "center"}}>
        <header className="flex flex-center flex-middle" style={{width: "100%", border: "1px solid white", textTransform: "uppercase", height:100}}>
          <span style={{padding: "0 10px"}}>{this.props.title}</span>
        </header>
        {this.props.children}
      </div>
    );
  }
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
};
