import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { NOTE_ROUTE, NOTE_CREATE_ROUTE } from '../constants'
import Form from '../components/Form';
import View from '../components/View';

export default (
  <Route path={NOTE_ROUTE}>
    <IndexRoute component={View} />

    <Route component={Form} path={NOTE_CREATE_ROUTE} />
  </Route>
);
