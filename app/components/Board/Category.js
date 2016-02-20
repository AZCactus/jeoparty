import React, { Component, PropTypes } from 'react';

export default class Category extends Component {

  render() {

    return (
      <div className="flex flex-column" style={{width: `${100 / 6}%`, textAlign: "center"}}>
        <header className="flex flex-center flex-middle" style={{width: "100%", borderLeft: "2px solid black", borderTop: "2px solid black", textTransform: "uppercase", height:60}}>
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
