// LIBRARY
import React from 'react';

if (process.env.BROWSER) {
  require('./_Footer.scss');
}

export default class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='footer'>
      </div>
    );
  }
}

Footer.prototype.displayName = 'Footer';
