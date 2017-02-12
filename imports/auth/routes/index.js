import React from 'react';
import { Route } from 'react-router';

import SimpleLayout from '/imports/app/components/SimpleLayout';
import LoginRegisterView from '../components/LoginRegisterView';

export default (
  <Route component={SimpleLayout}>
    <Route path="login" component={LoginRegisterView} />
    <Route path="register" component={LoginRegisterView} />
  </Route>
);
