import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from '/imports/modules/app/components/App';
import activitiesRoutes from '/imports/modules/activities/routes';

export default (
  <Router history={browserHistory}>
    <Route component={App} path="/">
      {activitiesRoutes}
    </Route>
  </Router>
)
