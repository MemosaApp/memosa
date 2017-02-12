import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Layout from '../components/ViewFormLayout';

import { MEMO_ROUTE } from '../constants';
import ViewForm from '../components/ViewForm';
import View from '../components/View';

export default (
  <Route>
    <Route component={Layout}>
      <IndexRoute component={ViewForm} />
    </Route>
    <Route path={MEMO_ROUTE}>
      <IndexRoute component={View} />
    </Route>
  </Route>
);
