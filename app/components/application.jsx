import React from 'react';
import { RouteHandler } from "react-router";

import Header from './header';

export default class Application extends React.Component {  
  render() {
    return (
      <div>
        <Header />
        <RouteHandler />
      </div>
    );
  }
};