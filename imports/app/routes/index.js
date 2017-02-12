import React from 'react';
import { Route } from 'react-router';

import App from '/imports/app/components/App';
import { isLoggedOut } from '/imports/auth/utilities';

import { routes as authRoutes } from '/imports/auth';
import activitiesRoutes from '/imports/activities/routes';
import memosRoutes from '/imports/memos/routes';

const requireAuth = (nextState, replace) => {
  if (isLoggedOut()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export default (
  <Route component={App} path="/">
    {authRoutes}

    <Route onEnter={requireAuth}>
      {activitiesRoutes}
      {memosRoutes}
    </Route>
  </Route>
);
