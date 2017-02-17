import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { ACTIVITIES_ROUTE } from '../constants';

import View from '../components/View';

export default (
  <Route path={ACTIVITIES_ROUTE}>
    <IndexRoute component={View} />
  </Route>
);
