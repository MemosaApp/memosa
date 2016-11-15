import React from 'react';
import { IndexRoute, Route } from 'react-router';

import View from '../components/View';

export default (
  <Route>
    <IndexRoute component={View} />
  </Route>
);
