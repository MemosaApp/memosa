import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Layout from '../components/ViewListLayout';

import { NOTEBOOKS_ROUTE } from '../constants';
import ViewList from '../components/ViewList';

export default (
  <Route path={NOTEBOOKS_ROUTE} component={Layout}>
    <IndexRoute component={ViewList} />
  </Route>
);
