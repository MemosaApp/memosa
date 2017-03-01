import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { NOTEBOOKS_ROUTE } from '/imports/app/notebooks/constants';

import Layout from '../components/ViewFormLayout';

import { MEMOS_ROUTE } from '../constants';
import ViewForm from '../components/ViewForm';
import View from '../components/View';

export default (
  <Route>
    <Route component={Layout}>
      <IndexRoute component={ViewForm} />
    </Route>
    <Route path={`${NOTEBOOKS_ROUTE}/:notebookId/${MEMOS_ROUTE}`}>
      <IndexRoute component={View} />
    </Route>
  </Route>
);
