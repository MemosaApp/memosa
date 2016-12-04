import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { MEMO_ROUTE, MEMO_CREATE_ROUTE } from '../constants';
import Form from '../components/Form';
import View from '../components/View';

export default (
  <Route path={MEMO_ROUTE}>
    <IndexRoute component={View} />

    <Route component={Form} path={MEMO_CREATE_ROUTE} />
  </Route>
);
