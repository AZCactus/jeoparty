// LIBRARY
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import {Router, Route, IndexRoute} from 'react-router';

// COMPONENT
import Application from './components/App/App';

import createLocation from 'history/lib/createLocation';

let history = createLocation();

export default (
  <Router history={history}>
    <Route path='/' component={Application} />
  </Router>
);
